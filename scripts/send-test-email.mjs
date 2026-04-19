import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { config } from "dotenv";
import { readFileSync } from "fs";

// Load env
const envPath = "/home/ubuntu/athlynx-platform/.env";
try {
  const envContent = readFileSync(envPath, "utf8");
  envContent.split("\n").forEach(line => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) process.env[key.trim()] = vals.join("=").trim().replace(/^["']|["']$/g, "");
  });
} catch {}

const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TO = "cdozier14@athlynx.ai";
const FROM = process.env.SES_FROM_EMAIL || "noreply@athlynx.ai";

const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;max-width:600px;">
<tr><td style="background:linear-gradient(135deg,#0066ff,#00c2ff);padding:40px;text-align:center;">
  <div style="font-size:48px;font-weight:900;color:#fff;letter-spacing:4px;">ATHLYNX</div>
  <div style="font-size:13px;color:rgba(255,255,255,0.8);letter-spacing:6px;margin-top:6px;">THE ATHLETE'S PLAYBOOK</div>
</td></tr>
<tr><td style="padding:40px;">
  <h2 style="color:#fff;font-size:24px;margin:0 0 16px;">Welcome, Chad! 🏆</h2>
  <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 8px;">
    This is a <strong style="color:#00c2ff;">TEST EMAIL</strong> from the ATHLYNX platform email system.
  </p>
  <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px;">
    Your ATHLYNX account is ready. You have <strong style="color:#00c2ff;">7 days of free access</strong> to every feature — no credit card required.
  </p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">🤖 <strong>LYNX AI Companion</strong> — Your personal AI for every sport scenario</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">🏆 <strong>NIL Portal</strong> — Connect with brands and close deals</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">📊 <strong>AI Recruiter</strong> — Get discovered by coaches nationwide</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">💬 <strong>Messenger</strong> — Connect with athletes, agents, and coaches</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">🎯 <strong>Transfer Portal</strong> — Navigate your path to a better program</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">💰 <strong>NIL Vault</strong> — Secure your contracts and track earnings</span></td></tr>
    <tr><td style="height:8px;"></td></tr>
    <tr><td style="padding:12px 16px;background:#1a3a8f;border-radius:8px;"><span style="color:#fff;font-size:14px;">🤝 <strong>White-Label Platform</strong> — License ATHLYNX for your school or team</span></td></tr>
  </table>

  <!-- Subscription Expiry Warning Preview -->
  <div style="background:#1e1a00;border:1px solid #f59e0b;border-radius:12px;padding:20px;margin-bottom:24px;">
    <div style="color:#f59e0b;font-weight:900;font-size:14px;margin-bottom:8px;">⚠️ SUBSCRIPTION EXPIRY SYSTEM — ACTIVE</div>
    <p style="color:#fbbf24;font-size:13px;margin:0;line-height:1.5;">
      You will receive reminders at: <strong>7 days</strong>, <strong>5 days</strong>, then <strong>daily</strong> until renewal. Each email contains a one-tap renewal link. Timestamp logged: <strong>${new Date().toISOString()}</strong>
    </p>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
    <tr><td align="center">
      <a href="https://athlynx.ai" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00c2ff);color:#fff;font-weight:900;font-size:16px;padding:16px 40px;border-radius:50px;text-decoration:none;letter-spacing:1px;">ENTER THE PLATFORM →</a>
    </td></tr>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <a href="https://athlynx.ai/investor-hub" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#f97316);color:#000;font-weight:900;font-size:14px;padding:12px 32px;border-radius:50px;text-decoration:none;letter-spacing:1px;">💰 INVESTOR DECK →</a>
    </td></tr>
  </table>
</td></tr>
<tr><td style="background:#060d1f;padding:24px;text-align:center;border-top:1px solid #1e3a6e;">
  <p style="color:#475569;font-size:12px;margin:0;">© 2026 Dozier Holdings Group LLC · Houston, TX</p>
  <p style="color:#475569;font-size:12px;margin:4px 0;">athlynx.ai · athlynxapp.vip · athlynx.io · athlynx.net</p>
  <p style="color:#334155;font-size:11px;margin:8px 0 0;">Questions? <a href="mailto:cdozier14@athlynx.ai" style="color:#00c2ff;">cdozier14@athlynx.ai</a></p>
  <p style="color:#1e293b;font-size:10px;margin:8px 0 0;">Secured by Okta / Auth0 · HIPAA-Compliant · Dreams Do Come True 2026</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const command = new SendEmailCommand({
  Source: FROM,
  Destination: { ToAddresses: [TO] },
  Message: {
    Subject: { Data: "🏆 ATHLYNX — Welcome Email System Test | cdozier14@athlynx.ai", Charset: "UTF-8" },
    Body: {
      Html: { Data: html, Charset: "UTF-8" },
      Text: { Data: `Welcome to ATHLYNX, Chad! This is a test email from the ATHLYNX platform. Visit https://athlynx.ai to get started. Timestamp: ${new Date().toISOString()}`, Charset: "UTF-8" },
    },
  },
});

try {
  const result = await ses.send(command);
  console.log("✅ Email sent successfully!");
  console.log("Message ID:", result.MessageId);
  console.log("To:", TO);
  console.log("From:", FROM);
  console.log("Timestamp:", new Date().toISOString());
} catch (err) {
  console.error("❌ Email failed:", err.message);
  console.error("Code:", err.Code || err.code);
  console.error("FROM used:", FROM);
  console.error("AWS Region:", process.env.AWS_REGION);
  console.error("Has Access Key:", !!process.env.AWS_ACCESS_KEY_ID);
}
