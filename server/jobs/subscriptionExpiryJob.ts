/**
 * Subscription Expiry Email Scheduler
 * Runs every hour. Checks all users with active trials or subscriptions
 * expiring soon and sends warning emails at 7, 5, 4, 3, 2, 1 days before expiry.
 * On Day 0 (expired), sends a suspension email.
 *
 * Email cadence:
 *   Day 7 → first warning
 *   Day 5 → second warning
 *   Day 4, 3, 2, 1 → daily countdown
 *   Day 0 → suspended + mandatory popup flag
 */

import { getDb } from "../db";
import { users, subscriptionExpiryNotices, expiryEmailTypeValues } from "../../drizzle/schema";
import { eq, and, isNotNull, lt, gte } from "drizzle-orm";
import { sendSubscriptionExpiryEmail } from "../services/aws-ses";

type ExpiryEmailType = typeof expiryEmailTypeValues[number];

const DAYS_TO_NOTIFY: { days: number; type: ExpiryEmailType }[] = [
  { days: 7, type: "7_day" },
  { days: 5, type: "5_day" },
  { days: 4, type: "4_day" },
  { days: 3, type: "3_day" },
  { days: 2, type: "2_day" },
  { days: 1, type: "1_day" },
  { days: 0, type: "expired" },
];

export async function runSubscriptionExpiryJob(): Promise<void> {
  const now = new Date();
  const eightDaysFromNow = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);

  // Find all users with trial ending within 8 days (or already expired within last 24h)
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const db = await getDb();
  if (!db) {
    console.warn("[ExpiryJob] Database not available, skipping run");
    return;
  }

  const usersToCheck = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      trialEndsAt: users.trialEndsAt,
      stripeSubscriptionId: users.stripeSubscriptionId,
    })
    .from(users)
    .where(
      and(
        isNotNull(users.trialEndsAt),
        gte(users.trialEndsAt, oneDayAgo),
        lt(users.trialEndsAt, eightDaysFromNow)
      )
    );

  for (const user of usersToCheck) {
    if (!user.email || !user.trialEndsAt) continue;

    // Skip users who already have an active paid subscription
    if (user.stripeSubscriptionId) continue;

    const expiresAt = new Date(user.trialEndsAt);
    const msRemaining = expiresAt.getTime() - now.getTime();
    const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

    // Find which email type to send based on days remaining
    const notifyEntry = DAYS_TO_NOTIFY.find(n => n.days === Math.max(0, daysRemaining));
    if (!notifyEntry) continue;

    // Check if we already sent this email type for this user
    const alreadySent = await db!
      .select({ id: subscriptionExpiryNotices.id })
      .from(subscriptionExpiryNotices)
      .where(
        and(
          eq(subscriptionExpiryNotices.userId, user.id),
          eq(subscriptionExpiryNotices.emailType, notifyEntry.type)
        )
      )
      .limit(1);

    if (alreadySent.length > 0) continue;

    // Send the email
    let success = false;
    try {
      success = await sendSubscriptionExpiryEmail({
        to: user.email,
        name: user.name || "Athlete",
        daysRemaining: notifyEntry.days,
        emailType: notifyEntry.type,
        expiresAt,
      });
    } catch (err) {
      console.error(`[ExpiryJob] Failed to send ${notifyEntry.type} email to ${user.email}:`, err);
    }

    // Log the notice in DB
    await db!.insert(subscriptionExpiryNotices).values({
      userId: user.id,
      stripeSubscriptionId: user.stripeSubscriptionId || null,
      daysRemaining: notifyEntry.days,
      emailType: notifyEntry.type,
      status: success ? "sent" : "failed",
      emailSentAt: now,
      expiresAt,
    });

    console.log(`[ExpiryJob] ${success ? "✓" : "✗"} Sent ${notifyEntry.type} email to ${user.email} (userId=${user.id})`);
  }
}

let expiryJobInterval: NodeJS.Timeout | null = null;

export function startSubscriptionExpiryJob(): void {
  if (expiryJobInterval) return; // Already running

  // Run immediately on startup, then every hour
  runSubscriptionExpiryJob().catch(err => console.error("[ExpiryJob] Initial run error:", err));

  expiryJobInterval = setInterval(() => {
    runSubscriptionExpiryJob().catch(err => console.error("[ExpiryJob] Scheduled run error:", err));
  }, 60 * 60 * 1000); // Every hour

  console.log("[ExpiryJob] Subscription expiry email scheduler started (runs every hour)");
}

export function stopSubscriptionExpiryJob(): void {
  if (expiryJobInterval) {
    clearInterval(expiryJobInterval);
    expiryJobInterval = null;
  }
}
