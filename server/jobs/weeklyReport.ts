/**
 * Weekly Signup Report — ATHLYNX
 * Runs every Sunday at 8:00 AM CST (14:00 UTC)
 * Sends a signup summary email to Chad Dozier
 */
import cron from "node-cron";
import { getWeeklySignupStats } from "../db";
import { sendEmail } from "../services/aws-ses";

const OWNER_EMAILS = [
  "cdozier14@dozierholdingsgroup.com.mx",
  "cdozier14@athlynx.ai",
  "cdozier@dozierholdingsgroup.com",
  "chad.dozier@icloud.com",
  "chaddozier75@gmail.com",
];

export async function sendWeeklyReport(): Promise<void> {
  try {
    const stats = await getWeeklySignupStats();
    const trend = stats.thisWeek >= stats.lastWeek
      ? `&#x2191; Up ${stats.thisWeek - stats.lastWeek} from last week`
      : `&#x2193; Down ${stats.lastWeek - stats.thisWeek} from last week`;
    const trendColor = stats.thisWeek >= stats.lastWeek ? "#22c55e" : "#f59e0b";
    const methodRows = stats.topLoginMethods.length > 0
      ? stats.topLoginMethods.map((m: { method: string; count: number }) =>
          `<tr style="background:#0c1a32;"><td style="padding:10px 16px;border-bottom:1px solid #1e3a6e;color:#94a3b8;font-size:13px;">${m.method}</td><td style="padding:10px 16px;border-bottom:1px solid #1e3a6e;color:#fff;font-size:13px;text-align:right;font-weight:bold;">${m.count}</td></tr>`
        ).join("")
      : `<tr><td colspan="2" style="padding:10px 16px;color:#475569;text-align:center;font-size:13px;">No signups this week</td></tr>`;

    const weekEnd = new Date();
    const weekStart = new Date();
    weekStart.setDate(weekEnd.getDate() - 7);
    const dateRange = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#0d1b3e;border-radius:16px;overflow:hidden;border:1px solid #1e3a6e;">
<tr><td style="background:linear-gradient(135deg,#0066ff,#00c2ff);padding:28px 32px;">
  <div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:3px;">ATHLYNX</div>
  <div style="font-size:12px;color:rgba(255,255,255,0.85);letter-spacing:5px;margin-top:4px;">WEEKLY GROWTH REPORT</div>
</td></tr>
<tr><td style="padding:32px;">
  <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Week of <strong style="color:#fff;">${dateRange}</strong></p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr>
      <td width="33%" style="text-align:center;padding:16px;background:#0a1628;border-radius:12px;margin-right:8px;">
        <div style="font-size:36px;font-weight:900;color:#00c2ff;">${stats.thisWeek}</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">NEW THIS WEEK</div>
        <div style="font-size:11px;color:${trendColor};margin-top:6px;">${trend}</div>
      </td>
      <td width="8px"></td>
      <td width="33%" style="text-align:center;padding:16px;background:#0a1628;border-radius:12px;">
        <div style="font-size:36px;font-weight:900;color:#f59e0b;">${stats.lastWeek}</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">LAST WEEK</div>
      </td>
      <td width="8px"></td>
      <td width="33%" style="text-align:center;padding:16px;background:#0a1628;border-radius:12px;">
        <div style="font-size:36px;font-weight:900;color:#22c55e;">${stats.total}</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">TOTAL USERS</div>
      </td>
    </tr>
  </table>
  <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">Sign-up Methods This Week</h3>
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;margin-bottom:24px;">
    <tr style="background:#1a3a8f;"><th style="padding:10px 16px;color:#94a3b8;font-size:12px;text-align:left;font-weight:600;">METHOD</th><th style="padding:10px 16px;color:#94a3b8;font-size:12px;text-align:right;font-weight:600;">COUNT</th></tr>
    ${methodRows}
  </table>
  <div style="text-align:center;">
    <a href="https://athlynx.ai/admin" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00c2ff);color:#fff;font-weight:900;font-size:14px;padding:12px 32px;border-radius:50px;text-decoration:none;">VIEW FULL DASHBOARD</a>
  </div>
</td></tr>
<tr><td style="background:#060d1f;padding:20px;text-align:center;border-top:1px solid #1e3a6e;">
  <p style="color:#475569;font-size:12px;margin:0;">ATHLYNX &middot; A Dozier Holdings Group Company &middot; athlynx.ai</p>
  <p style="color:#334155;font-size:11px;margin:6px 0 0;">This report is sent every Sunday at 8:00 AM CST</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    const text = `ATHLYNX Weekly Growth Report — ${dateRange}\n\nNew signups this week: ${stats.thisWeek}\nLast week: ${stats.lastWeek}\nTotal users: ${stats.total}\n\nView dashboard: https://athlynx.ai/admin`;

    await Promise.all(
      OWNER_EMAILS.map(to =>
        sendEmail({
          to,
          subject: `📊 ATHLYNX Weekly Report: ${stats.thisWeek} new signups (${dateRange})`,
          html,
          text,
        })
      )
    );
    console.log(`[WeeklyReport] Sent to ${OWNER_EMAILS.length} addresses — ${stats.thisWeek} new this week, ${stats.total} total`);
  } catch (err) {
    console.error("[WeeklyReport] Failed to send:", err);
  }
}

/**
 * Start the weekly report cron job.
 * Runs every Sunday at 8:00 AM CST (14:00 UTC).
 */
export function startWeeklyReportJob(): void {
  // Cron: 0 14 * * 0 = 14:00 UTC every Sunday = 8:00 AM CST
  cron.schedule("0 14 * * 0", () => {
    console.log("[WeeklyReport] Running scheduled weekly report...");
    sendWeeklyReport();
  }, { timezone: "UTC" });
  console.log("[WeeklyReport] Weekly report job scheduled — runs every Sunday at 8:00 AM CST");
}
