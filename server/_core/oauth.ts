import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Application, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { sendWelcomeEmail, sendOwnerNewUserAlert } from "../services/aws-ses";
import { notifyOwner } from "./notification";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getQueryParam(req: Request, key: string): string | undefined {
  const value = (req.query as Record<string, unknown>)[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Application) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      // Check if this is a brand-new user (before upsert)
      const existingUser = await db.getUserByOpenId(userInfo.openId);
      const isNewUser = !existingUser;

      // Set trial end date for new users
      const trialEndsAt = isNewUser ? new Date(Date.now() + SEVEN_DAYS_MS) : undefined;

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
        ...(trialEndsAt ? { trialEndsAt } : {}),
      });

      // Send welcome email + SMS to new users (fire-and-forget)
      if (isNewUser) {
        const name = userInfo.name || "Athlete";
        if (userInfo.email) {
          sendWelcomeEmail(userInfo.email, name).catch((err: unknown) => {
            console.warn("[OAuth] Welcome email failed:", err);
          });
        }
        console.log(`[OAuth] New user registered: ${userInfo.email ?? "(no email)"} — trial ends ${trialEndsAt?.toISOString()}`);
        // Notify owner of every new signup
        notifyOwner({
          title: `New ATHLYNX User: ${userInfo.name || "Unknown Athlete"}`,
          content: `A new athlete just joined ATHLYNX!\n\nName: ${userInfo.name || "N/A"}\nEmail: ${userInfo.email || "N/A"}\nLogin Method: ${userInfo.loginMethod ?? userInfo.platform ?? "OAuth"}\nSigned Up: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CST\nTrial Ends: ${trialEndsAt?.toLocaleDateString("en-US") ?? "N/A"}`,
        }).catch((err: unknown) => {
          console.warn("[OAuth] Owner notification failed:", err);
        });
        // Send owner alert email to both addresses
        sendOwnerNewUserAlert({
          name: userInfo.name || "Unknown Athlete",
          email: userInfo.email || "N/A",
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? "OAuth",
          signedUpAt: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
          trialEndsAt: trialEndsAt?.toLocaleDateString("en-US") ?? "N/A",
        }).catch((err: unknown) => {
          console.warn("[OAuth] Owner alert email failed:", err);
        });
      }

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Redirect all users to feed after OAuth sign-in
      res.redirect(302, "/feed");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
