/**
 * Test SES email delivery — run with: node test-email.mjs
 */
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "cdozier@dozierholdingsgroup.com";
const TO_EMAIL = "cdozier14@dozierholdingsgroup.com.mx";

const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID?.substring(0, 8) + "...");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("SES_FROM_EMAIL:", FROM_EMAIL);
console.log("Sending test email to:", TO_EMAIL);

try {
  const result = await ses.send(new SendEmailCommand({
    Source: `ATHLYNX <${FROM_EMAIL}>`,
    Destination: { ToAddresses: [TO_EMAIL] },
    Message: {
      Subject: { Data: "🏆 ATHLYNX — Email Service Test", Charset: "UTF-8" },
      Body: {
        Html: {
          Data: `
            <div style="background:#0a0f1e;padding:40px;font-family:Arial,sans-serif;">
              <div style="background:#0d1b3e;border-radius:16px;padding:32px;border:1px solid #1e3a6e;max-width:560px;margin:0 auto;">
                <div style="font-size:28px;font-weight:900;color:#00c2ff;letter-spacing:3px;margin-bottom:8px;">ATHLYNX</div>
                <h2 style="color:#fff;margin:0 0 16px;">✅ Email Service is Working!</h2>
                <p style="color:#94a3b8;font-size:15px;">This is a test email confirming your AWS SES integration is live and working correctly.</p>
                <p style="color:#94a3b8;font-size:15px;">Every new user signup will trigger an alert to all 5 of your email addresses.</p>
                <div style="margin-top:24px;padding:16px;background:#060d1f;border-radius:8px;border:1px solid #1e3a6e;">
                  <p style="color:#f59e0b;font-size:13px;margin:0;font-weight:bold;">FROM: ${FROM_EMAIL}</p>
                  <p style="color:#94a3b8;font-size:13px;margin:4px 0 0;">Sent: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CST</p>
                </div>
              </div>
            </div>
          `,
          Charset: "UTF-8",
        },
        Text: {
          Data: "ATHLYNX Email Service Test — AWS SES is working correctly. Every new signup will alert all 5 of your email addresses.",
          Charset: "UTF-8",
        },
      },
    },
  }));
  console.log("✅ Email sent successfully! MessageId:", result.MessageId);
} catch (err) {
  console.error("❌ SES Error:", err.message);
  console.error("Error code:", err.Code || err.name);
  // Try to give helpful diagnosis
  if (err.message?.includes("not verified")) {
    console.error("\n⚠️  The FROM email address needs to be verified in AWS SES.");
    console.error("   Go to AWS Console → SES → Verified Identities → Verify:", FROM_EMAIL);
  }
  if (err.message?.includes("sandbox")) {
    console.error("\n⚠️  SES is in sandbox mode. Only verified email addresses can receive emails.");
    console.error("   Request production access in AWS SES console.");
  }
}
