/**
 * ATHLYNX EMAIL SERVICE
 * A DOZIER HOLDINGS GROUP COMPANY
 * 
 * Send real emails from the CRM Command Center
 * "One Stop Shop For All Your Needs"
 */

import nodemailer from "nodemailer";

// Email configuration
const EMAIL_CONFIG = {
  from: "ATHLYNX <noreply@athlynx.ai>",
  replyTo: "support@athlynx.ai",
};

// Create transporter (using environment variables)
const createTransporter = () => {
  // Check for SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }
  
  // Check for custom SMTP
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  // Fallback to console logging (development)
  return {
    sendMail: async (options: any) => {
      console.log("[EMAIL] Would send email:", {
        to: options.to,
        subject: options.subject,
        preview: options.text?.slice(0, 100) || options.html?.slice(0, 100),
      });
      return { messageId: `dev-${Date.now()}` };
    },
  };
};

const transporter = createTransporter();

// Email templates
export const EMAIL_TEMPLATES = {
  // Welcome email for new signups
  welcome: (name: string) => ({
    subject: "Welcome to ATHLYNX - Your Journey Begins! 🦁",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d4ff; font-size: 32px; margin: 0;">🦁 ATHLYNX</h1>
          <p style="color: #94a3b8; margin: 5px 0;">THE ATHLETE'S PLAYBOOK</p>
        </div>
        
        <h2 style="color: white; font-size: 24px;">Welcome, ${name}! 🎉</h2>
        
        <p style="color: #cbd5e1; line-height: 1.6;">
          You've just joined the future of athlete success. ATHLYNX is your all-in-one platform for:
        </p>
        
        <ul style="color: #cbd5e1; line-height: 2;">
          <li>💰 NIL Deal Discovery & Management</li>
          <li>📊 Performance Analytics</li>
          <li>🎯 Transfer Portal Navigation</li>
          <li>🤖 AI-Powered Career Guidance</li>
          <li>🏆 Brand Partnership Opportunities</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://athlynx.ai/portal" style="background: linear-gradient(90deg, #00d4ff, #0066ff); color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Get Started Now
          </a>
        </div>
        
        <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 30px;">
          "Dreams Do Come True" - Chad Allen Dozier Sr., Founder
        </p>
        
        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          A Dozier Holdings Group Company • Powered by Manus AI<br>
          © 2026 ATHLYNX AI Corporation. All rights reserved.
        </p>
      </div>
    `,
    text: `Welcome to ATHLYNX, ${name}! Your journey to athlete success begins now. Visit https://athlynx.ai/portal to get started.`,
  }),

  // VIP code welcome
  vipWelcome: (name: string, code: string) => ({
    subject: "🌟 VIP Access Granted - Welcome to the Inner Circle!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ffd700; font-size: 32px; margin: 0;">⭐ VIP ACCESS</h1>
          <p style="color: #00d4ff; margin: 5px 0;">ATHLYNX INNER CIRCLE</p>
        </div>
        
        <h2 style="color: white; font-size: 24px;">Welcome to the VIP Club, ${name}! 🎉</h2>
        
        <p style="color: #cbd5e1; line-height: 1.6;">
          Your VIP code <strong style="color: #ffd700;">${code}</strong> has been activated!
        </p>
        
        <div style="background: rgba(255, 215, 0, 0.1); border: 1px solid #ffd700; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #ffd700; margin-top: 0;">Your VIP Benefits:</h3>
          <ul style="color: #cbd5e1; line-height: 2;">
            <li>🔓 Early access to all features</li>
            <li>💎 Priority NIL deal matching</li>
            <li>🎯 Exclusive brand partnerships</li>
            <li>📞 Direct founder access</li>
            <li>🎁 Founding member perks forever</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://athlynx.ai/portal" style="background: linear-gradient(90deg, #ffd700, #ff8c00); color: black; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Access VIP Portal
          </a>
        </div>
        
        <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 30px;">
          "When I eat, EVERYONE eats" - Chad Allen Dozier Sr.
        </p>
        
        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          A Dozier Holdings Group Company • Powered by Manus AI
        </p>
      </div>
    `,
    text: `Welcome to the VIP Club, ${name}! Your code ${code} has been activated. Visit https://athlynx.ai/portal to access your exclusive benefits.`,
  }),

  // Team notification
  teamNotification: (subject: string, message: string, senderName: string) => ({
    subject: `[ATHLYNX TEAM] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e293b; color: white; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d4ff; font-size: 24px; margin: 0;">🎯 COMMAND CENTER</h1>
          <p style="color: #94a3b8; margin: 5px 0;">TEAM NOTIFICATION</p>
        </div>
        
        <div style="background: #0f172a; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h2 style="color: white; margin-top: 0;">${subject}</h2>
          <div style="color: #cbd5e1; line-height: 1.8; white-space: pre-wrap;">${message}</div>
        </div>
        
        <p style="color: #94a3b8; font-size: 14px;">
          Sent by: <strong>${senderName}</strong><br>
          Date: ${new Date().toLocaleString()}
        </p>
        
        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          Dozier Holdings Group • ATHLYNX Command Center
        </p>
      </div>
    `,
    text: `[ATHLYNX TEAM] ${subject}\n\n${message}\n\nSent by: ${senderName}`,
  }),

  // Partner invite
  partnerInvite: (name: string, accessCode: string, role: string) => ({
    subject: "🤝 You're Invited to Join ATHLYNX as a Partner!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00d4ff; font-size: 32px; margin: 0;">🤝 PARTNER INVITE</h1>
          <p style="color: #94a3b8; margin: 5px 0;">DOZIER HOLDINGS GROUP</p>
        </div>
        
        <h2 style="color: white; font-size: 24px;">Welcome to the Team, ${name}!</h2>
        
        <p style="color: #cbd5e1; line-height: 1.6;">
          You've been invited to join ATHLYNX as a <strong style="color: #00d4ff;">${role}</strong>.
        </p>
        
        <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid #00d4ff; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="color: #94a3b8; margin: 0 0 10px 0;">Your Access Code:</p>
          <p style="color: #00d4ff; font-size: 28px; font-weight: bold; font-family: monospace; margin: 0;">${accessCode}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://athlynx.ai/command-center" style="background: linear-gradient(90deg, #00d4ff, #0066ff); color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Access Command Center
          </a>
        </div>
        
        <p style="color: #94a3b8; font-size: 14px; text-align: center;">
          Keep this code secure. It grants access to the ATHLYNX Command Center.
        </p>
        
        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          A Dozier Holdings Group Company • Powered by Manus AI
        </p>
      </div>
    `,
    text: `Welcome to the Team, ${name}! You've been invited as a ${role}. Your access code: ${accessCode}. Visit https://athlynx.ai/command-center to get started.`,
  }),

  // Payment confirmation
  paymentConfirmation: (name: string, amount: number, plan: string) => ({
    subject: "✅ Payment Confirmed - Welcome to ATHLYNX " + plan + "!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; font-size: 32px; margin: 0;">✅ PAYMENT CONFIRMED</h1>
        </div>
        
        <h2 style="color: white; font-size: 24px;">Thank you, ${name}!</h2>
        
        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="color: #94a3b8; margin: 0;">Plan: <strong style="color: white;">${plan}</strong></p>
          <p style="color: #94a3b8; margin: 10px 0 0 0;">Amount: <strong style="color: #22c55e; font-size: 24px;">$${amount.toFixed(2)}</strong></p>
        </div>
        
        <p style="color: #cbd5e1; line-height: 1.6;">
          Your subscription is now active. You have full access to all ${plan} features.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://athlynx.ai/portal" style="background: linear-gradient(90deg, #22c55e, #16a34a); color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          A Dozier Holdings Group Company • Powered by Manus AI
        </p>
      </div>
    `,
    text: `Payment Confirmed! Thank you, ${name}. Your ${plan} subscription ($${amount.toFixed(2)}) is now active.`,
  }),
};

// Send email function
export async function sendEmail(
  to: string | string[],
  template: keyof typeof EMAIL_TEMPLATES,
  templateData: any
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailContent = (EMAIL_TEMPLATES[template] as any)(...Object.values(templateData));
    
    const result = await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      replyTo: EMAIL_CONFIG.replyTo,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    console.log(`[EMAIL] Sent ${template} email to ${to}: ${result.messageId}`);
    
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error(`[EMAIL] Failed to send ${template} email:`, error);
    return { success: false, error: error.message };
  }
}

// Send custom email
export async function sendCustomEmail(
  to: string | string[],
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const result = await transporter.sendMail({
      from: EMAIL_CONFIG.from,
      replyTo: EMAIL_CONFIG.replyTo,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html: htmlContent,
      text: textContent || htmlContent.replace(/<[^>]*>/g, ""),
    });
    
    console.log(`[EMAIL] Sent custom email to ${to}: ${result.messageId}`);
    
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error("[EMAIL] Failed to send custom email:", error);
    return { success: false, error: error.message };
  }
}

// Send team email (to all partners)
export async function sendTeamEmail(
  subject: string,
  message: string,
  senderName: string,
  recipients: string[]
): Promise<{ success: boolean; sent: number; failed: number }> {
  const template = EMAIL_TEMPLATES.teamNotification(subject, message, senderName);
  
  let sent = 0;
  let failed = 0;
  
  for (const email of recipients) {
    try {
      await transporter.sendMail({
        from: EMAIL_CONFIG.from,
        replyTo: EMAIL_CONFIG.replyTo,
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
      sent++;
    } catch (error) {
      console.error(`[EMAIL] Failed to send to ${email}:`, error);
      failed++;
    }
  }
  
  console.log(`[EMAIL] Team email sent: ${sent} success, ${failed} failed`);
  
  return { success: failed === 0, sent, failed };
}
