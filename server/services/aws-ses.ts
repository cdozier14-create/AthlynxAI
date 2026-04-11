/**
 * AWS SES Service - Email Verification
 * ATHLYNX AI Corporation
 * 
 * @author ATHLYNX AI Corporation
 * @date January 8, 2026
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

/**
 * Send verification email via AWS SES
 */
export async function sendVerificationEmail(
  email: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL || "noreply@athlynx.ai",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "ATHLYNX Verification Code",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">ATHLYNX</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">The Perfect Storm</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 24px;">Verification Code</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Your ATHLYNX verification code is:
              </p>
              
              <!-- Code Box -->
              <div style="background-color: #f3f4f6; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 0 0 30px 0;">
                <span style="font-size: 36px; font-weight: bold; color: #1e3a8a; letter-spacing: 8px;">${code}</span>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                This code expires in <strong>10 minutes</strong>.
              </p>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                If you didn't request this code, please ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
                © 2026 ATHLYNX AI Corporation. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                A Dozier Holdings Group Company
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
            `,
            Charset: "UTF-8",
          },
          Text: {
            Data: `Your ATHLYNX verification code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, please ignore this email.\n\n© 2026 ATHLYNX AI Corporation. All rights reserved.\nA Dozier Holdings Group Company`,
            Charset: "UTF-8",
          },
        },
      },
    });
    
    await sesClient.send(command);
    
    console.log(`[AWS SES] Email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('[AWS SES Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

export default { sendVerificationEmail };
