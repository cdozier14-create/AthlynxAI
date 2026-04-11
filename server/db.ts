import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import { 
  InsertUser, users, 
  vipCodes, InsertVipCode, VipCode,
  waitlist, InsertWaitlistEntry,
  posts, InsertPost,
  athleteProfiles, InsertAthleteProfile,
  follows, likes, comments,
  conversations, conversationParticipants, messages, InsertMessage,
  nilDeals, workouts, transferEntries, notifications, schools,
  signupAnalytics, InsertSignupAnalytic,
  customerEvents, InsertCustomerEvent,
  revenueEvents, InsertRevenueEvent,
  socialConnections, InsertSocialConnection,
  onboardingSteps, InsertOnboardingStep,
  partnerAccess, InsertPartnerAccess,
  milestones, InsertMilestone,
  transferPortalEntries, playbooks
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
        ssl: { rejectUnauthorized: true }
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

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // MySQL upsert: insert or update on duplicate key
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;