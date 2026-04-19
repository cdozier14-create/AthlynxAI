/**
 * One-off script: send welcome SMS to Chad's number via AWS SNS / Twilio fallback
 * Run: node send-test-sms.mjs
 */
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { readFileSync } from "fs";
import { resolve } from "path";

// Env vars are already injected from the platform environment

const PHONE = "+16014985282";
const NAME = "Chad";
const MESSAGE = `Welcome to ATHLYNX, ${NAME}! 🏆 Your 7-day free trial has started. Visit https://athlynx.ai to explore NIL deals, AI recruiting, Transfer Portal & more. Reply STOP to unsubscribe.`;

async function trySNS() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-1";
  if (!accessKeyId || !secretAccessKey) {
    console.log("[SNS] No credentials found, skipping SNS.");
    return false;
  }
  const sns = new SNSClient({ region, credentials: { accessKeyId, secretAccessKey } });
  try {
    const result = await sns.send(new PublishCommand({
      PhoneNumber: PHONE,
      Message: MESSAGE,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": { DataType: "String", StringValue: "Transactional" },
      },
    }));
    console.log("[SNS] ✅ SMS sent! MessageId:", result.MessageId);
    return true;
  } catch (err) {
    console.error("[SNS] ❌ Failed:", err.message);
    return false;
  }
}

async function tryTwilio() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;
  if (!accountSid || !authToken || !fromPhone) {
    console.log("[Twilio] No credentials found, skipping Twilio.");
    return false;
  }
  try {
    const { default: twilio } = await import("twilio");
    const client = twilio(accountSid, authToken);
    const msg = await client.messages.create({ from: fromPhone, to: PHONE, body: MESSAGE });
    console.log("[Twilio] ✅ SMS sent! SID:", msg.sid);
    return true;
  } catch (err) {
    console.error("[Twilio] ❌ Failed:", err.message);
    return false;
  }
}

(async () => {
  console.log(`Sending welcome SMS to ${PHONE}...`);
  const snsSent = await trySNS();
  if (!snsSent) {
    const twilioSent = await tryTwilio();
    if (!twilioSent) {
      console.error("❌ All SMS providers failed.");
      process.exit(1);
    }
  }
})();
