import { eq, sql, gte, and, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  InsertUser,
  users,
  waitlist,
  crmContacts,
  crmPipeline,
  activityLog,
  posts,
  nilDeals,
  transferPortalEntries,
  conversations,
  conversationParticipants,
  messages,
  notifications,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: any = null;
let _pool: mysql.Pool | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionLimit: 10,
        connectTimeout: 10000,
      });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }
    if (user.trialEndsAt !== undefined) {
      values.trialEndsAt = user.trialEndsAt;
      updateSet.trialEndsAt = user.trialEndsAt;
    }
    if (user.phone !== undefined) {
      values.phone = user.phone;
      updateSet.phone = user.phone;
    }
    if (user.phoneVerified !== undefined) {
      values.phoneVerified = user.phoneVerified;
      updateSet.phoneVerified = user.phoneVerified;
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // MySQL uses onDuplicateKeyUpdate instead of onConflictDoUpdate
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Waitlist ─────────────────────────────────────────────────────────────────
export async function getWaitlistCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(waitlist);
  return Number(result[0]?.count ?? 0);
}

export async function getWaitlistEntries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(waitlist).orderBy(waitlist.createdAt);
}

export async function addToWaitlist(data: { email: string; name?: string; sport?: string; school?: string; phone?: string; role?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(waitlist).values(data).onDuplicateKeyUpdate({ set: { email: data.email } });
}

// ─── CRM ──────────────────────────────────────────────────────────────────────
export async function getCrmContacts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(crmContacts).orderBy(crmContacts.createdAt);
}

export async function getCrmPipeline() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(crmPipeline).orderBy(crmPipeline.updatedAt);
}

// ─── Activity Log ─────────────────────────────────────────────────────────────
export async function logActivity(userId: number | null, eventType: string, metadata?: Record<string, unknown>) {
  const db = await getDb();
  if (!db) return;
  await db.insert(activityLog).values({
    userId: userId ?? undefined,
    eventType,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
  });
}

export async function getActivityLog(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityLog).orderBy(activityLog.createdAt).limit(limit);
}

// ─── Stats ────────────────────────────────────────────────────────────────────
export async function getWeeklySignupStats() {
  const db = await getDb();
  if (!db) return { thisWeek: 0, lastWeek: 0, total: 0, topLoginMethods: [] as { method: string; count: number }[] };
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);
  const twoWeeksStart = new Date(now);
  twoWeeksStart.setDate(now.getDate() - 14);
  const [thisWeekResult, lastWeekResult, totalResult, loginMethods] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(users).where(gte(users.createdAt, weekStart)),
    db.select({ count: sql<number>`count(*)` }).from(users).where(and(gte(users.createdAt, twoWeeksStart), lt(users.createdAt, weekStart))),
    db.select({ count: sql<number>`count(*)` }).from(users),
    db.select({ method: users.loginMethod, count: sql<number>`count(*)` }).from(users).where(gte(users.createdAt, weekStart)).groupBy(users.loginMethod),
  ]);
  return {
    thisWeek: Number(thisWeekResult[0]?.count ?? 0),
    lastWeek: Number(lastWeekResult[0]?.count ?? 0),
    total: Number(totalResult[0]?.count ?? 0),
    topLoginMethods: loginMethods.map((r: { method: string | null; count: number }) => ({ method: r.method ?? 'unknown', count: Number(r.count) })),
  };
}

export async function getPlatformStats() {
  const db = await getDb();
  if (!db) return { totalUsers: 0, waitlistCount: 0, nilDealsCount: 0, transferCount: 0 };
  const [userCount, waitlistCount, nilCount, transferCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(users),
    db.select({ count: sql<number>`count(*)` }).from(waitlist),
    db.select({ count: sql<number>`count(*)` }).from(nilDeals),
    db.select({ count: sql<number>`count(*)` }).from(transferPortalEntries),
  ]);
  return {
    totalUsers: Number(userCount[0]?.count ?? 0),
    waitlistCount: Number(waitlistCount[0]?.count ?? 0),
    nilDealsCount: Number(nilCount[0]?.count ?? 0),
    transferCount: Number(transferCount[0]?.count ?? 0),
  };
}
