/**
 * AWS SES Email Service — ATHLYNX
 * Primary: AWS SES | Fallback: SendGrid
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "cdozier14@athlynx.ai";
const FROM_NAME = "ATHLYNX";

function getSESClient() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-1";
  if (!accessKeyId || !secretAccessKey) return null;
  return new SESClient({ region, credentials: { accessKeyId, secretAccessKey } });
}

async function trySendGrid(to: string, subject: string, html: string, text?: string): Promise<boolean> {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return false;
  try {
    const { default: sgMail } = await import("@sendgrid/mail");
    sgMail.setApiKey(key);
    await sgMail.send({ to, from: { email: FROM_EMAIL, name: FROM_NAME }, subject, html, ...(text ? { text } : {}) });
    console.log(`[SendGrid] Email sent to ${to}: "${subject}"`);
    return true;
  } catch (err: any) {
    console.error("[SendGrid] Failed:", err.message);
    return false;
  }
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email via AWS SES with SendGrid fallback.
 */
export async function sendEmail(opts: EmailOptions): Promise<boolean> {
  const { to, subject, html, text } = opts;

  // Primary: AWS SES
  const ses = getSESClient();
  if (ses) {
    try {
      await (ses as any).send(new SendEmailCommand({
        Source: `${FROM_NAME} <${FROM_EMAIL}>`,
        Destination: { ToAddresses: [to] },
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Html: { Data: html, Charset: "UTF-8" },
            ...(text ? { Text: { Data: text, Charset: "UTF-8" } } : {}),
          },
        },
      }));
      console.log(`[SES] Email sent to ${to}: "${subject}"`);
      return true;
    } catch (err: any) {
      console.error("[SES] Failed, trying SendGrid fallback:", err.message);
    }
  }

  // Fallback: SendGrid
  return trySendGrid(to, subject, html, text);
}

// ─── Email Templates ───────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;">
<tr><td style="background:linear-gradient(135deg,#0066ff,#00c2ff);padding:40px;text-align:center;">
  <div style="font-size:48px;font-weight:900;color:#fff;letter-spacing:4px;">ATHLYNX</div>
  <div style="font-size:13px;color:rgba(255,255,255,0.8);letter-spacing:6px;margin-top:6px;">THE ATHLETE'S PLAYBOOK</div>
</td></tr>
<tr><td style="padding:40px;">
  <h2 style="color:#fff;font-size:24px;margin:0 0 16px;">Welcome, ${name}! 🏆</h2>
  <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 24px;">
    Your ATHLYNX account is ready. You have <strong style="color:#00c2ff;">7 days of free access</strong> to every feature — no credit card required.
  </p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;margin-bottom:8px;"><span style="color:#fff;font-size:14px;">🤖 <strong>LYNX AI Companion</strong> — Your personal AI for every sport scenario</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">🏆 <strong>NIL Portal</strong> — Connect with brands and close deals</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">📊 <strong>AI Recruiter</strong> — Get discovered by coaches nationwide</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">💬 <strong>Messenger</strong> — Connect with athletes, agents, and coaches</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">🎯 <strong>Transfer Portal</strong> — Navigate your path to a better program</span></td></tr>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <a href="https://athlynx.ai" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00c2ff);color:#fff;font-weight:900;font-size:16px;padding:16px 40px;border-radius:50px;text-decoration:none;letter-spacing:1px;">START YOUR JOURNEY →</a>
    </td></tr>
  </table>
</td></tr>
<tr><td style="background:#060d1f;padding:24px;text-align:center;border-top:1px solid #1e3a6e;">
  <p style="color:#475569;font-size:12px;margin:0;">A Dozier Holdings Group Company · athlynx.ai</p>
  <p style="color:#334155;font-size:11px;margin:8px 0 0;">Questions? <a href="mailto:cdozier@dozierholdingsgroup.com" style="color:#00c2ff;">cdozier@dozierholdingsgroup.com</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return sendEmail({
    to,
    subject: "Welcome to ATHLYNX — Your 7-Day Free Trial Has Started 🏆",
    html,
    text: `Welcome to ATHLYNX, ${name}! Your 7-day free trial has started. Visit https://athlynx.ai to get started.`,
  });
}

export async function sendVerificationEmail(
  to: string,
  code: string,
  name?: string,
  signupDate?: Date
): Promise<boolean> {
  const displayName = name || "Athlete";
  const dateStr = (signupDate || new Date()).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short",
  });
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;">

<!-- HEADER -->
<tr><td style="background:linear-gradient(135deg,#0066ff,#00c2ff);padding:32px 40px;text-align:center;">
  <div style="font-size:36px;font-weight:900;color:#fff;letter-spacing:5px;">ATHLYNX</div>
  <div style="font-size:11px;color:rgba(255,255,255,0.85);letter-spacing:6px;margin-top:5px;">THE ATHLETE'S PLAYBOOK</div>
</td></tr>

<!-- BODY -->
<tr><td style="padding:36px 40px;">
  <h2 style="color:#fff;font-size:22px;margin:0 0 8px;">Hey ${displayName}! 👋</h2>
  <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 28px;">Welcome to ATHLYNX. Use the code below to verify your account and unlock your <strong style="color:#00c2ff;">7-day free trial</strong>.</p>

  <!-- CODE BOX -->
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr><td align="center">
      <div style="background:linear-gradient(135deg,#0a1628,#0d2050);border:2px solid #0066ff;border-radius:16px;padding:28px 40px;display:inline-block;">
        <div style="font-size:13px;color:#94a3b8;letter-spacing:3px;margin-bottom:10px;">YOUR VERIFICATION CODE</div>
        <div style="font-size:48px;font-weight:900;color:#00c2ff;letter-spacing:14px;font-family:monospace;">${code}</div>
        <div style="font-size:12px;color:#475569;margin-top:10px;">⏱ Expires in 10 minutes</div>
      </div>
    </td></tr>
  </table>

  <!-- STAMP -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060d1f;border-radius:10px;padding:16px;margin-bottom:24px;border:1px solid #1e3a6e;">
    <tr>
      <td style="padding:8px 16px;border-bottom:1px solid #1e3a6e;"><span style="color:#475569;font-size:11px;display:block;">FULL NAME</span><span style="color:#fff;font-size:14px;font-weight:bold;">${displayName}</span></td>
    </tr>
    <tr>
      <td style="padding:8px 16px;border-bottom:1px solid #1e3a6e;"><span style="color:#475569;font-size:11px;display:block;">EMAIL</span><span style="color:#00c2ff;font-size:14px;">${to}</span></td>
    </tr>
    <tr>
      <td style="padding:8px 16px;"><span style="color:#475569;font-size:11px;display:block;">SIGNED UP</span><span style="color:#f59e0b;font-size:13px;">${dateStr}</span></td>
    </tr>
  </table>

  <p style="color:#334155;font-size:12px;margin:0;text-align:center;">If you didn't request this, you can safely ignore this email.</p>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#060d1f;padding:20px 40px;text-align:center;border-top:1px solid #1e3a6e;">
  <p style="color:#475569;font-size:12px;margin:0;">ATHLYNX &middot; A Dozier Holdings Group Company</p>
  <p style="color:#334155;font-size:11px;margin:6px 0 0;">Questions? <a href="mailto:cdozier@dozierholdingsgroup.com" style="color:#00c2ff;text-decoration:none;">cdozier@dozierholdingsgroup.com</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  return sendEmail({
    to,
    subject: `${code} is your ATHLYNX verification code, ${displayName}`,
    html,
    text: `Hey ${displayName}! Your ATHLYNX verification code is: ${code}\nSigned up: ${dateStr}\nExpires in 10 minutes.`,
  });
}

export async function sendTrialExpiryEmail(to: string, name: string): Promise<boolean> {
  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:40px 20px;background:#0a0f1e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;padding:40px;">
<tr><td style="text-align:center;padding-bottom:24px;">
  <div style="font-size:32px;font-weight:900;color:#fff;letter-spacing:4px;">ATHLYNX</div>
</td></tr>
<tr><td>
  <h2 style="color:#fff;font-size:22px;margin:0 0 12px;">Your Trial Ends Tomorrow, ${name}</h2>
  <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 28px;">Don't lose access to LYNX AI, NIL deals, recruiting tools, and more. Upgrade now to keep your momentum going.</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <a href="https://athlynx.ai/pricing" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00c2ff);color:#fff;font-weight:900;font-size:15px;padding:14px 36px;border-radius:50px;text-decoration:none;">UPGRADE NOW →</a>
    </td></tr>
  </table>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return sendEmail({
    to,
    subject: `${name}, your ATHLYNX trial ends tomorrow — don't lose access`,
    html,
    text: `${name}, your ATHLYNX trial ends tomorrow. Upgrade at https://athlynx.ai/pricing`,
  });
}

/**
 * Send owner alert email to cdozier14@dozierholdingsgroup.com.mx on every new user signup
 */
export async function sendOwnerNewUserAlert(opts: {
  name: string;
  email: string;
  loginMethod: string;
  signedUpAt: string;
  trialEndsAt: string;
}): Promise<boolean> {
  const OWNER_EMAILS = [
    "cdozier14@dozierholdingsgroup.com.mx",
    "cdozier14@athlynx.ai",
    "cdozier@dozierholdingsgroup.com",
    "chad.dozier@icloud.com",
    "chaddozier75@gmail.com",
  ];
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;">
<tr><td style="background:linear-gradient(135deg,#0066ff,#00c2ff);padding:28px 32px;">
  <div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:3px;">ATHLYNX</div>
  <div style="font-size:12px;color:rgba(255,255,255,0.85);letter-spacing:5px;margin-top:4px;">NEW USER ALERT</div>
</td></tr>
<tr><td style="padding:32px;">
  <h2 style="color:#00c2ff;font-size:22px;margin:0 0 24px;">&#127942; A new athlete just joined!</h2>
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;">
    <tr style="background:#0a1628;"><td style="padding:12px 16px;border-bottom:1px solid #1e3a6e;"><span style="color:#94a3b8;font-size:12px;display:block;margin-bottom:2px;">NAME</span><span style="color:#fff;font-size:17px;font-weight:bold;">${opts.name}</span></td></tr>
    <tr style="background:#0c1a32;"><td style="padding:12px 16px;border-bottom:1px solid #1e3a6e;"><span style="color:#94a3b8;font-size:12px;display:block;margin-bottom:2px;">EMAIL</span><span style="color:#00c2ff;font-size:17px;font-weight:bold;">${opts.email}</span></td></tr>
    <tr style="background:#0a1628;"><td style="padding:12px 16px;border-bottom:1px solid #1e3a6e;"><span style="color:#94a3b8;font-size:12px;display:block;margin-bottom:2px;">LOGIN METHOD</span><span style="color:#fff;font-size:15px;">${opts.loginMethod}</span></td></tr>
    <tr style="background:#0c1a32;"><td style="padding:12px 16px;border-bottom:1px solid #1e3a6e;"><span style="color:#94a3b8;font-size:12px;display:block;margin-bottom:2px;">SIGNED UP</span><span style="color:#fff;font-size:15px;">${opts.signedUpAt} CST</span></td></tr>
    <tr style="background:#0a1628;"><td style="padding:12px 16px;"><span style="color:#94a3b8;font-size:12px;display:block;margin-bottom:2px;">TRIAL ENDS</span><span style="color:#f59e0b;font-size:15px;font-weight:bold;">${opts.trialEndsAt}</span></td></tr>
  </table>
  <div style="margin-top:24px;text-align:center;">
    <a href="https://athlynx.ai/admin" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00c2ff);color:#fff;font-weight:900;font-size:14px;padding:12px 32px;border-radius:50px;text-decoration:none;">VIEW ADMIN DASHBOARD</a>
  </div>
</td></tr>
<tr><td style="background:#060d1f;padding:20px;text-align:center;border-top:1px solid #1e3a6e;">
  <p style="color:#475569;font-size:12px;margin:0;">ATHLYNX &middot; A Dozier Holdings Group Company &middot; athlynx.ai</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  const results = await Promise.all(
    OWNER_EMAILS.map(to => sendEmail({
      to,
      subject: `\uD83C\uDFC6 New ATHLYNX Signup: ${opts.name} (${opts.email})`,
      html,
      text: `New ATHLYNX signup!\nName: ${opts.name}\nEmail: ${opts.email}\nLogin: ${opts.loginMethod}\nSigned Up: ${opts.signedUpAt} CST\nTrial Ends: ${opts.trialEndsAt}\n\nView dashboard: https://athlynx.ai/admin`,
    }))
  );
  return results.some(r => r);
}

export default { sendEmail, sendWelcomeEmail, sendVerificationEmail, sendTrialExpiryEmail, sendOwnerNewUserAlert };

/**
 * Send subscription expiry warning or suspension email.
 * Supports 7-day, 5-day, 4-day, 3-day, 2-day, 1-day, and expired types.
 */
export async function sendSubscriptionExpiryEmail(opts: {
  to: string;
  name: string;
  daysRemaining: number;
  emailType: string;
  expiresAt: Date;
}): Promise<boolean> {
  const isExpired = opts.emailType === "expired";
  const renewUrl = "https://athlynx.ai/billing";
  const formattedDate = opts.expiresAt.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const urgencyColor = opts.daysRemaining <= 1 ? "#ef4444" : opts.daysRemaining <= 3 ? "#f97316" : "#1e88e5";
  const subject = isExpired
    ? `⚠️ Your ATHLYNX account has been suspended`
    : opts.daysRemaining === 1
    ? `🚨 FINAL WARNING: Your ATHLYNX access expires TOMORROW`
    : `⏰ Your ATHLYNX access expires in ${opts.daysRemaining} days`;

  const headline = isExpired
    ? `Your ATHLYNX Access Has Been Suspended`
    : `Your ATHLYNX Access Expires in ${opts.daysRemaining} Day${opts.daysRemaining !== 1 ? "s" : ""}`;

  const bodyText = isExpired
    ? `Your ATHLYNX subscription has expired and your account has been suspended. Renew now to restore full access to all features.`
    : `Don't lose access to your athlete platform. Your subscription expires on ${formattedDate}. Renew now to keep your edge.`;

  const ctaText = isExpired
    ? "RESTORE MY ACCESS"
    : `RENEW NOW — ${opts.daysRemaining} DAY${opts.daysRemaining !== 1 ? "S" : ""} LEFT`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#060d1f;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#060d1f;">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0a1628;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;max-width:600px;">
  <tr><td style="background:linear-gradient(135deg,#0a1f44,#0d2b5e);padding:32px 40px;text-align:center;border-bottom:2px solid ${urgencyColor};">
    <div style="font-size:36px;font-weight:900;letter-spacing:3px;color:#fff;">ATHLYNX</div>
    <div style="color:#94a3b8;font-size:11px;letter-spacing:4px;margin-top:4px;">THE ATHLETE'S PLAYBOOK</div>
  </td></tr>
  <tr><td style="background:${urgencyColor}20;border-bottom:1px solid ${urgencyColor}40;padding:16px 40px;text-align:center;">
    <span style="color:${urgencyColor};font-size:13px;font-weight:900;letter-spacing:2px;">${isExpired ? "⚠️ ACCOUNT SUSPENDED" : `⏰ ${opts.daysRemaining} DAY${opts.daysRemaining !== 1 ? "S" : ""} REMAINING`}</span>
  </td></tr>
  <tr><td style="padding:40px;">
    <h1 style="color:#fff;font-size:24px;font-weight:900;margin:0 0 16px;">${headline}</h1>
    <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 32px;">Hi ${opts.name},<br><br>${bodyText}</p>
    ${!isExpired ? `<div style="background:#0d2b5e;border:1px solid #1e3a6e;border-radius:12px;padding:20px;margin-bottom:32px;">
      <div style="color:#94a3b8;font-size:12px;margin-bottom:8px;">SUBSCRIPTION EXPIRES</div>
      <div style="color:#fff;font-size:18px;font-weight:900;">${formattedDate}</div>
    </div>` : ""}
    <div style="text-align:center;margin:32px 0;">
      <a href="${renewUrl}" style="display:inline-block;background:linear-gradient(135deg,#1565c0,#1e88e5);color:#fff;font-weight:900;font-size:18px;padding:18px 48px;border-radius:50px;text-decoration:none;letter-spacing:1px;box-shadow:0 8px 32px rgba(30,136,229,0.4);">${ctaText}</a>
    </div>
    <p style="color:#475569;font-size:13px;text-align:center;margin:24px 0 0;">Questions? Contact us at <a href="mailto:cdozier14@athlynx.ai" style="color:#1e88e5;">cdozier14@athlynx.ai</a></p>
  </td></tr>
  <tr><td style="background:#060d1f;padding:24px 40px;text-align:center;border-top:1px solid #1e3a6e;">
    <p style="color:#334155;font-size:12px;margin:0;">ATHLYNX &middot; A Dozier Holdings Group Company &middot; Houston, TX</p>
    <p style="color:#334155;font-size:11px;margin:8px 0 0;">You are receiving this because your ATHLYNX subscription is expiring.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return sendEmail({
    to: opts.to,
    subject,
    html,
    text: `${headline}\n\n${bodyText}\n\nRenew now: ${renewUrl}\n\nATHLYNX · cdozier14@athlynx.ai`,
  });
}
