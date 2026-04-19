/**
 * Verification Service - Email codes (SMS handled by Auth0)
 * ATHLYNX – A Dozier Holdings Group Company
 */
import { getDb } from "../db";
import { verificationCodes } from "../../drizzle/schema";
import { sendVerificationEmail } from "./aws-ses";
import { eq, and, gt } from "drizzle-orm";

/** Generate a random 6-digit code */
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Send a verification code via email (primary) and SMS (if phone provided) */
export async function sendVerificationCode(
  email: string,
  phone?: string,
  type: "signup" | "login" | "password_reset" = "signup",
  name?: string
): Promise<{ success: boolean; error?: string; smsSent?: boolean; emailSent?: boolean }> {
  try {
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const signupDate = new Date();

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db.insert(verificationCodes).values({
      email,
      phone: phone ?? null,
      code,
      type,
      verified: false,
      expiresAt,
    });

    const emailSent = await sendVerificationEmail(email, code, name, signupDate);

    return {
      success: true,
      emailSent,
      smsSent: false, // SMS handled by Auth0
    };
  } catch (error) {
    console.error("[Verification] Error sending code:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send verification code",
    };
  }
}

/** Verify a code submitted by the user */
export async function verifyCode(
  email: string,
  code: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const now = new Date();
    const [verification] = await db
      .select()
      .from(verificationCodes)
      .where(
        and(
          eq(verificationCodes.email, email),
          eq(verificationCodes.code, code),
          eq(verificationCodes.verified, false),
          gt(verificationCodes.expiresAt, now)
        )
      )
      .limit(1);

    if (!verification) {
      return { valid: false, error: "Invalid or expired code" };
    }

    await db
      .update(verificationCodes)
      .set({ verified: true })
      .where(eq(verificationCodes.id, verification.id));

    return { valid: true };
  } catch (error) {
    console.error("[Verification] Error verifying code:", error);
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Verification failed",
    };
  }
}
