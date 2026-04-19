import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { sdk } from "../_core/sdk";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { users, verificationCodes } from "../../drizzle/schema";
import { eq, and, gt } from "drizzle-orm";
import { sendWelcomeEmail, sendOwnerNewUserAlert } from "../services/aws-ses";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/** Fire-and-forget welcome email + SMS + owner alert for a new user */
async function fireWelcomeNotifications(opts: {
  name: string;
  email: string;
  phone?: string | null;
  loginMethod: string;
  trialEndsAt: Date;
}) {
  const trialStr = opts.trialEndsAt.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago",
  });
  const signedUpStr = new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZone: "America/Chicago",
  });

  // Welcome email to new user
  sendWelcomeEmail(opts.email, opts.name).catch((e) =>
    console.warn("[Auth] Welcome email failed:", e?.message)
  );

  // Owner alert
  sendOwnerNewUserAlert({
    name: opts.name,
    email: opts.email,
    loginMethod: opts.loginMethod,
    signedUpAt: signedUpStr,
    trialEndsAt: trialStr,
  }).catch((e) => console.warn("[Auth] Owner alert failed:", e?.message));
}

export const customAuthRouter = router({
  /**
   * Register a new user with email + password
   */
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        phone: z.string().optional(),
        sport: z.string().optional(),
        school: z.string().optional(),
        year: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Check if email already registered
      const existing = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      if (existing.length > 0) {
        throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists" });
      }

      const passwordHash = await bcrypt.hash(input.password, 12);
      const openId = `custom_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const trialEndsAt = new Date(Date.now() + SEVEN_DAYS_MS);

      await db.insert(users).values({
        openId,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        loginMethod: "email",
        passwordHash,
        sport: input.sport ?? null,
        school: input.school ?? null,
        year: input.year ?? null,
        trialEndsAt,
        lastSignedIn: new Date(),
      });

      // Create session token
      const sessionToken = await sdk.createSessionToken(openId, {
        name: input.name,
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(ctx.req);
      (ctx.res as any).cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Fire welcome notifications (non-blocking)
      fireWelcomeNotifications({
        name: input.name,
        email: input.email,
        phone: input.phone,
        loginMethod: "email",
        trialEndsAt,
      });

      return { success: true, name: input.name };
    }),

  /**
   * Sign in with email + password
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [user] = await db.select().from(users).where(eq(users.email, input.email)).limit(1);

      if (!user || !user.passwordHash) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      // Update last signed in
      await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

      const sessionToken = await sdk.createSessionToken(user.openId ?? `custom_${user.id}`, {
        name: user.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(ctx.req);
      (ctx.res as any).cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return { success: true, name: user.name };
    }),

  /**
   * Reset password using a verified code
   */
  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        code: z.string().length(6),
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify the code is valid and not expired
      const now = new Date();
      const [verification] = await db
        .select()
        .from(verificationCodes)
        .where(
          and(
            eq(verificationCodes.email, input.email),
            eq(verificationCodes.code, input.code),
            eq(verificationCodes.type, "password_reset"),
            gt(verificationCodes.expiresAt, now)
          )
        )
        .limit(1);

      if (!verification) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired reset code" });
      }

      // Find the user
      const [user] = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No account found with this email" });
      }

      // Hash the new password and update
      const passwordHash = await bcrypt.hash(input.newPassword, 12);
      await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, user.id));

      // Mark the verification code as used
      await db
        .update(verificationCodes)
        .set({ verified: true })
        .where(eq(verificationCodes.id, verification.id));

      return { success: true };
    }),

  /**
   * Sync an Auth0 user to our local DB and create a session cookie.
   * Called from the /callback page after Auth0 login.
   */
  syncAuth0User: publicProcedure
    .input(
      z.object({
        token: z.string(),
        name: z.string(),
        email: z.string(),
        picture: z.string().optional(),
        sub: z.string(),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const openId = `auth0_${input.sub.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
      const trialEndsAt = new Date(Date.now() + SEVEN_DAYS_MS);
      const loginMethod = input.sub.startsWith("google") ? "google" : input.sub.startsWith("apple") ? "apple" : "auth0";

      const existing = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
      const isNewUser = existing.length === 0;

      if (isNewUser) {
        await db.insert(users).values({
          openId,
          name: input.name || null,
          email: input.email || null,
          avatarUrl: input.picture || null,
          phone: input.phone || null,
          loginMethod,
          trialEndsAt,
          lastSignedIn: new Date(),
        });

        // Fire welcome notifications for new users (non-blocking)
        if (input.email) {
          fireWelcomeNotifications({
            name: input.name || "Athlete",
            email: input.email,
            phone: input.phone,
            loginMethod,
            trialEndsAt,
          });
        }
      } else {
        await db.update(users).set({
          lastSignedIn: new Date(),
          name: input.name || existing[0].name,
          avatarUrl: input.picture || existing[0].avatarUrl,
        }).where(eq(users.openId, openId));
      }

      const sessionToken = await sdk.createSessionToken(openId, {
        name: input.name,
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      (ctx.res as any).cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      return { success: true, name: input.name, isNewUser };
    }),

  /**
   * Save phone number for current user and fire welcome SMS
   */
  savePhone: protectedProcedure
    .input(z.object({ phone: z.string().min(10).max(20) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const formatted = input.phone.startsWith("+") ? input.phone : `+1${input.phone.replace(/\D/g, "")}`;
      await db.update(users).set({ phone: formatted }).where(eq(users.id, ctx.user.id));
      return { success: true };
    }),

  /**
   * Sign out — clear session cookie
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    (ctx.res as any).clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true } as const;
  }),

  /**
   * Get current user
   */
  me: publicProcedure.query((opts) => opts.ctx.user),
});
