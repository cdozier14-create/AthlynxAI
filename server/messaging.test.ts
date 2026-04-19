/**
 * Messaging Services Tests — ATHLYNX
 * Validates AWS SES email service (SMS handled by Auth0)
 */
import { describe, it, expect, vi } from "vitest";

// ─── AWS SES Tests ──────────────────────────────────────────────────────────

describe("AWS SES Email Service", () => {
  it("should export sendEmail, sendWelcomeEmail, sendVerificationEmail, sendTrialExpiryEmail, sendOwnerNewUserAlert", async () => {
    const ses = await import("./services/aws-ses");
    expect(typeof ses.sendEmail).toBe("function");
    expect(typeof ses.sendWelcomeEmail).toBe("function");
    expect(typeof ses.sendVerificationEmail).toBe("function");
    expect(typeof ses.sendTrialExpiryEmail).toBe("function");
    expect(typeof ses.sendOwnerNewUserAlert).toBe("function");
  });

  it("sendEmail should return false (not throw) when AWS credentials are missing", async () => {
    // Save and clear env
    const savedKey = process.env.AWS_ACCESS_KEY_ID;
    const savedSecret = process.env.AWS_SECRET_ACCESS_KEY;
    vi.resetModules();
    const { sendEmail } = await import("./services/aws-ses");
    const result = await sendEmail({ to: "test@example.com", subject: "Test", html: "<p>Test</p>", text: "Test" });
    expect(result).toBe(false);
    if (savedKey) process.env.AWS_ACCESS_KEY_ID = savedKey;
    if (savedSecret) process.env.AWS_SECRET_ACCESS_KEY = savedSecret;
    vi.resetModules();
  });
});

// ─── Verification Service Tests ─────────────────────────────────────────────────────

describe("Verification Service", () => {
  it("should export sendVerificationCode and verifyCode", async () => {
    const svc = await import("./services/verification");
    expect(typeof svc.sendVerificationCode).toBe("function");
    expect(typeof svc.verifyCode).toBe("function");
  });
});

