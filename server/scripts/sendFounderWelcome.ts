/**
 * One-time script: Send founder welcome notification to Chad A. Dozier
 * Run with: npx tsx server/scripts/sendFounderWelcome.ts
 */
import "dotenv/config";
import { notifyOwner } from "../_core/notification";

const FOUNDER_CODE = "FOUNDER-ATHLYNX-2024";

async function main() {
  console.log("Sending founder welcome notification...");

  const content = `
🏆 ATHLYNX IS LIVE — FOUNDER WELCOME

Welcome, Chad A. Dozier!
Founder & CEO · ATHLYNX, Inc.

Your Founder Access Code: ${FOUNDER_CODE}
(Lifetime access · Never expires · Founder privileges)

PLATFORM IS LIVE AT:
→ https://athlynx.ai
→ https://athlynx.ai
→ https://athlynx.net
→ https://athlynx.io

WHAT'S LIVE TODAY:
✅ NIL Portal — Connect athletes with brands
✅ Messenger — Direct communication platform
✅ Diamond Grind — Baseball training & recruiting
✅ Warriors Playbook — Football strategy & film
✅ Transfer Portal — Navigate to the right program
✅ NIL Vault — Secure deal management
✅ AI Sales — AI-powered sponsorship automation
✅ AI Recruiter — Get discovered by coaches
✅ AI Content — Create viral content in seconds
✅ Faith — Faith-based athlete community
✅ Robotics — AI robotics division
✅ Infrastructure — Platform infrastructure division
✅ Investor Hub — World-class investor page with GTC gallery
✅ Subscription Expiry Emails — 7-day cadence scheduler live
✅ Storage Proxy — All icons now served via permanent CDN

THE VISION:
"The ONLY platform covering Youth → HS → College → Pro → Retired.
No one has ever done this. IPO is the end game."
— Chad A. Dozier, Founder & CEO

Founded November 2024 · Houston, TX
Contact: cdozier14@athlynx.ai
  `.trim();

  const success = await notifyOwner({
    title: "🏆 ATHLYNX IS LIVE — Founder Welcome & Platform Status",
    content,
  });

  if (success) {
    console.log("✅ Founder welcome notification sent successfully!");
  } else {
    console.warn("⚠️  Notification service unavailable. Platform is still live at https://athlynx.ai");
  }
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
