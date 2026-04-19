import {
  mysqlTable,
  int,
  varchar,
  text,
  boolean,
  timestamp,
  float,
  mysqlEnum,
  serial,
  json,
  tinyint,
} from "drizzle-orm/mysql-core";

// ─── Enums ────────────────────────────────────────────────────────────────────
export const userRoleValues = ["user", "admin"] as const;
export const nilDealStatusValues = ["pending", "active", "completed", "declined"] as const;
export const transferStatusValues = ["entered", "committed", "withdrawn"] as const;
export const verifTypeValues = ["signup", "login", "password_reset"] as const;
export const postTypeValues = ["status", "achievement", "workout", "nil_deal", "announcement", "milestone"] as const;
export const crmContactRoleValues = ["Athlete", "Coach", "Brand", "Agent", "Investor", "Team"] as const;
export const crmContactStatusValues = ["Lead", "Active", "VIP", "Churned"] as const;
export const crmPipelineStageValues = ["New Lead", "Contacted", "Demo Scheduled", "Proposal Sent", "Closed Won", "Closed Lost"] as const;
export const notifTypeValues = ["welcome", "vip_approved", "system_announcement", "custom", "credit_added", "new_feature", "promotion", "reminder", "achievement", "message"] as const;
export const notifPriorityValues = ["low", "normal", "high", "urgent"] as const;
export const postVisibilityValues = ["public", "followers", "private"] as const;
export const postMediaTypeValues = ["none", "image", "video", "gallery"] as const;
export const postSourceValues = ["nil_portal", "diamond_grind", "messenger", "transfer_portal", "faith", "warriors_playbook"] as const;
export const msgTypeValues = ["text", "image", "video", "file", "workout", "achievement", "system"] as const;
export const convTypeValues = ["direct", "group"] as const;
export const convParticipantRoleValues = ["member", "admin"] as const;

// ─── Core user table ─────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", userRoleValues).default("user").notNull(),
  sport: varchar("sport", { length: 64 }),
  school: varchar("school", { length: 128 }),
  year: varchar("year", { length: 32 }),
  bio: text("bio"),
  avatarUrl: text("avatarUrl"),
  phone: varchar("phone", { length: 20 }),
  trialEndsAt: timestamp("trialEndsAt"),
  phoneVerified: tinyint("phoneVerified").default(0).notNull(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  stripePlanId: varchar("stripePlanId", { length: 255 }),
  credits: int("credits").default(0).notNull(),
  aiCredits: int("aiCredits").default(0).notNull(),
  lastSignedIn: timestamp("lastSignedIn"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  onboardingRole: varchar("onboardingRole", { length: 64 }),
  onboardingData: text("onboardingData"),
  onboardingCompleted: tinyint("onboardingCompleted").default(0).notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Athlete profiles ─────────────────────────────────────────────────────────
export const athleteProfiles = mysqlTable("athlete_profiles", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  sport: varchar("sport", { length: 64 }),
  position: varchar("position", { length: 64 }),
  school: varchar("school", { length: 128 }),
  year: varchar("year", { length: 32 }),
  gpa: float("gpa"),
  height: varchar("height", { length: 16 }),
  weight: int("weight"),
  hometown: varchar("hometown", { length: 128 }),
  bio: text("bio"),
  hudlUrl: text("hudlUrl"),
  instagramUrl: text("instagramUrl"),
  twitterUrl: text("twitterUrl"),
  tiktokUrl: text("tiktokUrl"),
  recruitingScore: int("recruitingScore").default(0),
  nilValue: int("nilValue").default(0),
  transferStatus: varchar("transferStatus", { length: 32 }),
  classYear: varchar("classYear", { length: 16 }),
  state: varchar("state", { length: 64 }),
  recruitingStatus: varchar("recruitingStatus", { length: 32 }),
  followers: int("followers").default(0),
  coverUrl: text("coverUrl"),
  highlightUrl: text("highlightUrl"),
  instagram: varchar("instagram", { length: 128 }),
  twitter: varchar("twitter", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type AthleteProfile = typeof athleteProfiles.$inferSelect;

// ─── Posts / Feed ─────────────────────────────────────────────────────────────
export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  mediaUrls: json("mediaUrls"),
  mediaType: mysqlEnum("mediaType", postMediaTypeValues).default("none").notNull(),
  postType: mysqlEnum("postType", postTypeValues).default("status").notNull(),
  sourceApp: mysqlEnum("sourceApp", postSourceValues).default("nil_portal").notNull(),
  visibility: mysqlEnum("visibility", postVisibilityValues).default("public").notNull(),
  likesCount: int("likesCount").default(0).notNull(),
  commentsCount: int("commentsCount").default(0).notNull(),
  sharesCount: int("sharesCount").default(0).notNull(),
  isPinned: mysqlEnum("isPinned", ["yes", "no"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Post = typeof posts.$inferSelect;

export const postLikes = mysqlTable("post_likes", {
  id: serial("id").primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const postComments = mysqlTable("post_comments", {
  id: serial("id").primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Messaging ────────────────────────────────────────────────────────────────
export const conversations = mysqlTable("conversations", {
  id: serial("id").primaryKey(),
  type: mysqlEnum("type", convTypeValues).default("direct").notNull(),
  name: varchar("name", { length: 255 }),
  createdBy: int("createdBy").notNull(),
  lastMessageAt: timestamp("lastMessageAt"),
  lastMessagePreview: varchar("lastMessagePreview", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const conversationParticipants = mysqlTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversationId: int("conversationId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", convParticipantRoleValues).default("member").notNull(),
  lastReadAt: timestamp("lastReadAt"),
  unreadCount: int("unreadCount").default(0).notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: int("conversationId").notNull(),
  senderId: int("senderId").notNull(),
  content: text("content").notNull(),
  messageType: mysqlEnum("messageType", msgTypeValues).default("text").notNull(),
  mediaUrl: text("mediaUrl"),
  metadata: json("metadata"),
  isEdited: mysqlEnum("isEdited", ["yes", "no"]).default("no").notNull(),
  isDeleted: mysqlEnum("isDeleted", ["yes", "no"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Message = typeof messages.$inferSelect;

// ─── NIL Deals ────────────────────────────────────────────────────────────────
export const nilDeals = mysqlTable("nil_deals", {
  id: serial("id").primaryKey(),
  athleteId: int("athleteId").notNull(),
  brandName: varchar("brandName", { length: 128 }).notNull(),
  dealValue: int("dealValue").default(0).notNull(),
  status: mysqlEnum("status", nilDealStatusValues).default("pending").notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  contractUrl: text("contractUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type NilDeal = typeof nilDeals.$inferSelect;

// ─── Training Logs ────────────────────────────────────────────────────────────
export const trainingLogs = mysqlTable("training_logs", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  workout: varchar("workout", { length: 128 }).notNull(),
  duration: int("duration"),
  notes: text("notes"),
  performance: int("performance"),
  logDate: timestamp("logDate").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Transfer Portal ──────────────────────────────────────────────────────────
export const transferPortalEntries = mysqlTable("transfer_portal_entries", {
  id: serial("id").primaryKey(),
  athleteId: int("athleteId").notNull(),
  fromSchool: varchar("fromSchool", { length: 128 }),
  toSchool: varchar("toSchool", { length: 128 }),
  status: mysqlEnum("status", transferStatusValues).default("entered").notNull(),
  eligibilityYears: int("eligibilityYears"),
  enteredAt: timestamp("enteredAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", notifTypeValues).default("custom").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  link: varchar("link", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  priority: mysqlEnum("priority", notifPriorityValues).default("normal").notNull(),
  isRead: mysqlEnum("isRead", ["yes", "no"]).default("no").notNull(),
  isDismissed: mysqlEnum("isDismissed", ["yes", "no"]).default("no").notNull(),
  isBroadcast: mysqlEnum("isBroadcast", ["yes", "no"]).default("no").notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  readAt: timestamp("readAt"),
});

// ─── Verification Codes ───────────────────────────────────────────────────────
export const verificationCodes = mysqlTable("verification_codes", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  code: varchar("code", { length: 10 }).notNull(),
  type: mysqlEnum("type", verifTypeValues).default("signup").notNull(),
  verified: boolean("verified").default(false).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type InsertVerificationCode = typeof verificationCodes.$inferInsert;

// ─── Waitlist (mapped to waitlist_entries table in DB) ────────────────────────
export const waitlist = mysqlTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  sport: varchar("sport", { length: 100 }),
  school: varchar("school", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Waitlist = typeof waitlist.$inferSelect;

// ─── CRM Contacts ─────────────────────────────────────────────────────────────
export const crmContacts = mysqlTable("crm_contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 128 }),
  role: mysqlEnum("role", crmContactRoleValues).default("Athlete").notNull(),
  status: mysqlEnum("status", crmContactStatusValues).default("Lead").notNull(),
  notes: text("notes"),
  lastActivity: timestamp("lastActivity").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CrmContact = typeof crmContacts.$inferSelect;

// ─── CRM Pipeline ─────────────────────────────────────────────────────────────
export const crmPipeline = mysqlTable("crm_pipeline", {
  id: serial("id").primaryKey(),
  contactId: int("contactId").notNull(),
  stage: mysqlEnum("stage", crmPipelineStageValues).default("New Lead").notNull(),
  dealValue: int("dealValue").default(0),
  assignedTo: varchar("assignedTo", { length: 128 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type CrmPipeline = typeof crmPipeline.$inferSelect;

// ─── Activity Log ─────────────────────────────────────────────────────────────
export const activityLog = mysqlTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: int("userId"),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ActivityLog = typeof activityLog.$inferSelect;

// ─── Broadcast Messages ───────────────────────────────────────────────────────
export const broadcastMessages = mysqlTable("broadcast_messages", {
  id: serial("id").primaryKey(),
  senderId: int("senderId").notNull(),
  subject: varchar("subject", { length: 256 }).notNull(),
  body: text("body").notNull(),
  channel: mysqlEnum("channel", ["email", "in_app", "both"]).default("in_app").notNull(),
  recipientFilter: mysqlEnum("recipientFilter", ["all", "trial", "subscribed", "free"]).default("all").notNull(),
  recipientCount: int("recipientCount").default(0),
  status: mysqlEnum("status", ["draft", "sent", "failed"]).default("sent").notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type BroadcastMessage = typeof broadcastMessages.$inferSelect;

// ─── Athlete Feedback ─────────────────────────────────────────────────────────
export const feedbackStatusValues = ["open", "under_review", "planned", "completed", "declined"] as const;
export const feedbackCategoryValues = ["feature_request", "bug_report", "general", "content", "performance"] as const;

export const athleteFeedback = mysqlTable("athlete_feedback", {
  id: serial("id").primaryKey(),
  userId: int("userId"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  body: text("body").notNull(),
  category: mysqlEnum("category", feedbackCategoryValues).default("general").notNull(),
  votes: int("votes").default(0).notNull(),
  status: mysqlEnum("status", feedbackStatusValues).default("open").notNull(),
  adminReply: text("adminReply"),
  repliedAt: timestamp("repliedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AthleteFeedback = typeof athleteFeedback.$inferSelect;
export type InsertAthleteFeedback = typeof athleteFeedback.$inferInsert;

// ─── Feedback Votes (prevent double voting) ───────────────────────────────────
export const feedbackVotes = mysqlTable("feedback_votes", {
  id: serial("id").primaryKey(),
  feedbackId: int("feedbackId").notNull(),
  voterIdentifier: varchar("voterIdentifier", { length: 320 }).notNull(), // email or userId
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type FeedbackVote = typeof feedbackVotes.$inferSelect;

// ─── Subscription Expiry Notices ─────────────────────────────────────────────
export const expiryEmailTypeValues = ["7_day", "5_day", "4_day", "3_day", "2_day", "1_day", "expired"] as const;
export const expiryNoticeStatusValues = ["sent", "failed", "skipped"] as const;

export const subscriptionExpiryNotices = mysqlTable("subscription_expiry_notices", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  daysRemaining: int("daysRemaining").notNull(),
  emailType: mysqlEnum("emailType", expiryEmailTypeValues).notNull(),
  status: mysqlEnum("status", expiryNoticeStatusValues).default("sent").notNull(),
  emailSentAt: timestamp("emailSentAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type SubscriptionExpiryNotice = typeof subscriptionExpiryNotices.$inferSelect;
export type InsertSubscriptionExpiryNotice = typeof subscriptionExpiryNotices.$inferInsert;

// ─── AI Bot + Robot Data Collection ──────────────────────────────────────────
// Every AI interaction, robot session, and wearable data point streams here.
// This is the ATHLYNX proprietary data moat — the world's largest athlete dataset.
export const dataSourceTypeValues = ["ai_bot", "robot", "wearable", "video_analysis", "manual", "api_integration"] as const;
export const dataEventTypeValues = [
  "performance_metric", "biometric", "gps_tracking", "motion_capture",
  "ai_session", "recruitment_interaction", "training_session", "health_record",
  "game_stat", "combine_result", "injury_report", "recovery_score"
] as const;

export const athleteDataSources = mysqlTable("athlete_data_sources", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  sourceType: mysqlEnum("sourceType", dataSourceTypeValues).notNull(),
  deviceId: varchar("deviceId", { length: 255 }),
  firmwareVersion: varchar("firmwareVersion", { length: 64 }),
  isActive: boolean("isActive").default(true).notNull(),
  lastSeenAt: timestamp("lastSeenAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AthleteDataSource = typeof athleteDataSources.$inferSelect;

export const athleteDataEvents = mysqlTable("athlete_data_events", {
  id: serial("id").primaryKey(),
  athleteId: int("athleteId"),
  sourceId: int("sourceId"),
  sourceType: mysqlEnum("sourceType", dataSourceTypeValues).notNull(),
  eventType: mysqlEnum("eventType", dataEventTypeValues).notNull(),
  sport: varchar("sport", { length: 64 }),
  sessionId: varchar("sessionId", { length: 128 }),
  payload: json("payload").notNull(),
  heartRate: int("heartRate"),
  speed: float("speed"),
  distance: float("distance"),
  acceleration: float("acceleration"),
  recoveryScore: float("recoveryScore"),
  aiConfidence: float("aiConfidence"),
  latitude: float("latitude"),
  longitude: float("longitude"),
  deviceTimestamp: timestamp("deviceTimestamp"),
  processedAt: timestamp("processedAt"),
  isAnonymized: boolean("isAnonymized").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AthleteDataEvent = typeof athleteDataEvents.$inferSelect;
export type InsertAthleteDataEvent = typeof athleteDataEvents.$inferInsert;

export const athleteDataSummaries = mysqlTable("athlete_data_summaries", {
  id: serial("id").primaryKey(),
  athleteId: int("athleteId").notNull(),
  summaryDate: varchar("summaryDate", { length: 10 }).notNull(),
  sport: varchar("sport", { length: 64 }),
  totalEvents: int("totalEvents").default(0).notNull(),
  avgHeartRate: float("avgHeartRate"),
  maxSpeed: float("maxSpeed"),
  totalDistance: float("totalDistance"),
  avgRecoveryScore: float("avgRecoveryScore"),
  aiSessionCount: int("aiSessionCount").default(0).notNull(),
  robotSessionCount: int("robotSessionCount").default(0).notNull(),
  wearableSessionCount: int("wearableSessionCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type AthleteDataSummary = typeof athleteDataSummaries.$inferSelect;
