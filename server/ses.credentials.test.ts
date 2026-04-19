import { describe, it, expect } from "vitest";
import { SESClient, GetSendQuotaCommand } from "@aws-sdk/client-ses";

describe("AWS SES Credentials", () => {
  it("should have valid AWS credentials with SES access", async () => {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION || "us-east-1";

    expect(accessKeyId).toBeTruthy();
    expect(secretAccessKey).toBeTruthy();

    const client = new SESClient({
      region,
      credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
    });

    const quota = await client.send(new GetSendQuotaCommand({}));
    expect(quota.Max24HourSend).toBeGreaterThan(0);
    console.log("SES Quota:", quota.Max24HourSend, "emails/day | Sent:", quota.SentLast24Hours);
  });

  it("should have SES_FROM_EMAIL set to a verified address", () => {
    expect(process.env.SES_FROM_EMAIL).toBe("cdozier14@athlynx.ai");
  });
});
