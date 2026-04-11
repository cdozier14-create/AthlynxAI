import { int, mysqlTable, text, timestamp, varchar, boolean, json, decimal, serial, mysqlEnum } from "drizzle-orm/mysql-core";

// ==================== USERS ====================
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("open_id", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("login_method", { length: 64 }),
  role: varchar("role", { length: 32 }).default("user").notNull(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  isVip: boolean("is_vip").default(false).notNull(),
  vipCodeUsed: varchar("vip_code_used", { length: 32 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
  // Stripe & Subscription fields
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  subscriptionTier: varchar("subscription_tier", { length: 32 }).default("free"),
  credits: int("credits").default(0).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ==================== VIP CODES ====================
export const vipCodes = mysqlTable("vip_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 32 }).notNull().unique(),
  description: text("description"),
  maxUses: int("maxUses").default(1),
  currentUses: int("currentUses").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  expiresAt: timestamp("expiresAt"),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VipCode = typeof vipCodes.$inferSelect;
export type InsertVipCode = typeof vipCodes.$inferInsert;

// ==================== ATHLETE PROFILES ====================
export const athleteProfiles = mysqlTable("athlete_profiles", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  sport: varchar("sport", { length: 64 }),
  position: varchar("position", { length: 64 }),
  school: varchar("school", { length: 255 }),
  graduationYear: int("graduation_year"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  height: varchar("height", { length: 16 }),
  weight: varchar("weight", { length: 16 }),
  stats: json("stats"),
  highlights: json("highlights"),
  socialLinks: json("social_links"),
  transferStatus: varchar("transfer_status", { length: 32 }).default("not_in_portal"),
  nilStatus: varchar("nil_status", { length: 32 }).default("not_available"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type AthleteProfile = typeof athleteProfiles.$inferSelect;
export type InsertAthleteProfile = typeof athleteProfiles.$inferInsert;

// ==================== NIL DEALS ====================
export const nilDeals = mysqlTable("nil_deals", {
  id: serial("id").primaryKey(),
  athleteId: int("athlete_id").notNull(),
  brandId: int("brand_id"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  value: decimal("value", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 32 }).default("pending").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  terms: text("terms"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type NilDeal = typeof nilDeals.$inferSelect;
export type InsertNilDeal = typeof nilDeals.$inferInsert;

// ==================== POSTS ====================
export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  content: text("content"),
  mediaUrls: json("media_urls"),
  postType: varchar("post_type", { length: 32 }).default("text").notNull(),
  visibility: varchar("visibility", { length: 32 }).default("public").notNull(),
  likesCount: int("likes_count").default(0).notNull(),
  commentsCount: int("comments_count").default(0).notNull(),
  sharesCount: int("shares_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// ==================== COMMENTS ====================
export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
  content: text("content").notNull(),
  parentId: int("parent_id"),
  likesCount: int("likes_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// ==================== LIKES ====================
export const likes = mysqlTable("likes", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  postId: int("post_id"),
  commentId: int("comment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;

// ==================== FOLLOWS ====================
export const follows = mysqlTable("follows", {
  id: serial("id").primaryKey(),
  followerId: int("follower_id").notNull(),
  followingId: int("following_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Follow = typeof follows.$inferSelect;
export type InsertFollow = typeof follows.$inferInsert;

// ==================== CONVERSATIONS ====================
export const conversations = mysqlTable("conversations", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 32 }).default("direct").notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

export const conversationParticipants = mysqlTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversationId: int("conversation_id").notNull(),
  userId: int("user_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  lastReadAt: timestamp("last_read_at"),
});

export type ConversationParticipant = typeof conversationParticipants.$inferSelect;

// ==================== MESSAGES ====================
export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: int("conversation_id").notNull(),
  senderId: int("sender_id").notNull(),
  content: text("content"),
  mediaUrl: text("media_url"),
  messageType: varchar("message_type", { length: 32 }).default("text").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

// ==================== VERIFICATION CODES ====================
export const verificationCodes = mysqlTable("verification_codes", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  code: varchar("code", { length: 10 }).notNull(),
  type: varchar("type", { length: 32 }).default("signup").notNull(),
  verified: boolean("verified").default(false).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VerificationCode = typeof verificationCodes.$inferSelect;
export type InsertVerificationCode = typeof verificationCodes.$inferInsert;

// ==================== WAITLIST ====================
export const waitlist = mysqlTable("waitlist", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  role: varchar("waitlistRole", { length: 32 }).notNull(),
  sport: varchar("sport", { length: 64 }),
  referralCode: varchar("referralCode", { length: 32 }),
  status: varchar("waitlistStatus", { length: 32 }).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type InsertWaitlistEntry = typeof waitlist.$inferInsert;

// ==================== NOTIFICATIONS ====================
export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  data: json("data"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;

// ==================== WORKOUTS ====================
export const workouts = mysqlTable("workouts", {
  id: serial("id").primaryKey(),
  athleteId: int("athlete_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  sport: varchar("sport", { length: 64 }),
  duration: int("duration"),
  intensity: varchar("intensity", { length: 32 }).default("medium"),
  exercises: json("exercises"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = typeof workouts.$inferInsert;

// ==================== TRANSFER PORTAL ====================
export const transferEntries = mysqlTable("transfer_entries", {
  id: serial("id").primaryKey(),
  athleteId: int("athlete_id").notNull(),
  fromSchool: varchar("from_school", { length: 255 }),
  toSchool: varchar("to_school", { length: 255 }),
  sport: varchar("sport", { length: 64 }),
  position: varchar("position", { length: 64 }),
  status: varchar("status", { length: 32 }).default("in_portal"),
  enteredPortalAt: timestamp("entered_portal_at"),
  committedAt: timestamp("committed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TransferEntry = typeof transferEntries.$inferSelect;
export type InsertTransferEntry = typeof transferEntries.$inferInsert;

// ==================== SCHOOLS ====================
export const schools = mysqlTable("schools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  conference: varchar("conference", { length: 128 }),
  division: varchar("division", { length: 32 }),
  logoUrl: text("logo_url"),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type School = typeof schools.$inferSelect;
export type InsertSchool = typeof schools.$inferInsert;

// ==================== CRM / ANALYTICS ====================

export const signupAnalytics = mysqlTable("signup_analytics", {
  id: serial("id").primaryKey(),
  signupNumber: int("signup_number").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  browser: varchar("browser", { length: 64 }),
  device: varchar("device", { length: 64 }),
  os: varchar("os", { length: 64 }),
  role: varchar("role", { length: 64 }),
  sport: varchar("sport", { length: 64 }),
  referralSource: varchar("referral_source", { length: 255 }),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  signupType: varchar("signup_type", { length: 32 }),
  country: varchar("country", { length: 64 }),
  city: varchar("city", { length: 128 }),
  isConverted: boolean("is_converted").default(false),
  isPaying: boolean("is_paying").default(false),
  lifetimeValue: decimal("lifetime_value", { precision: 12, scale: 2 }).default("0"),
  userId: int("user_id"),
  firstPaymentAt: timestamp("first_payment_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SignupAnalytic = typeof signupAnalytics.$inferSelect;
export type InsertSignupAnalytic = typeof signupAnalytics.$inferInsert;

export const customerEvents = mysqlTable("customer_events", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  waitlistId: int("waitlist_id"),
  eventType: varchar("event_type", { length: 64 }).notNull(),
  eventName: varchar("event_name", { length: 255 }).notNull(),
  eventData: json("event_data"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CustomerEvent = typeof customerEvents.$inferSelect;
export type InsertCustomerEvent = typeof customerEvents.$inferInsert;

export const revenueEvents = mysqlTable("revenue_events", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  eventType: varchar("event_type", { length: 64 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  source: varchar("source", { length: 64 }),
  description: text("description"),
  metadata: json("metadata"),
  stripePaymentId: varchar("stripe_payment_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type RevenueEvent = typeof revenueEvents.$inferSelect;
export type InsertRevenueEvent = typeof revenueEvents.$inferInsert;

export const socialConnections = mysqlTable("social_connections", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  platform: varchar("platform", { length: 64 }).notNull(),
  platformUserId: varchar("platform_user_id", { length: 255 }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SocialConnection = typeof socialConnections.$inferSelect;
export type InsertSocialConnection = typeof socialConnections.$inferInsert;

export const onboardingSteps = mysqlTable("onboarding_steps", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  stepName: varchar("step_name", { length: 64 }).notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type OnboardingStep = typeof onboardingSteps.$inferSelect;
export type InsertOnboardingStep = typeof onboardingSteps.$inferInsert;

export const partnerAccess = mysqlTable("partner_access", {
  id: serial("id").primaryKey(),
  partnerId: varchar("partner_id", { length: 64 }).notNull(),
  partnerName: varchar("partner_name", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 64 }),
  accessLevel: varchar("access_level", { length: 32 }).default("basic"),
  accessCode: varchar("access_code", { length: 64 }),
  apiKey: varchar("api_key", { length: 255 }),
  isActive: boolean("is_active").default(true),
  lastAccessAt: timestamp("last_access_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PartnerAccess = typeof partnerAccess.$inferSelect;
export type InsertPartnerAccess = typeof partnerAccess.$inferInsert;

export const milestones = mysqlTable("milestones", {
  id: serial("id").primaryKey(),
  milestoneName: varchar("milestone_name", { length: 255 }).notNull(),
  milestoneType: varchar("milestone_type", { length: 64 }).notNull(),
  targetValue: int("target_value").notNull(),
  currentValue: int("current_value").default(0),
  achieved: boolean("achieved").default(false),
  achievedAt: timestamp("achieved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = typeof milestones.$inferInsert;

// ==================== TRANSFER PORTAL (LEGACY COMPAT) ====================

export const transferPortalEntries = mysqlTable("transfer_portal_entries", {
  id: serial("id").primaryKey(),
  athleteName: varchar("athlete_name", { length: 255 }).notNull(),
  fromSchool: varchar("from_school", { length: 255 }),
  toSchool: varchar("to_school", { length: 255 }),
  sport: varchar("sport", { length: 64 }),
  position: varchar("position", { length: 64 }),
  starRating: int("star_rating"),
  status: varchar("status", { length: 32 }).default("in_portal"),
  enteredPortalAt: timestamp("entered_portal_at"),
  committedAt: timestamp("committed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TransferPortalEntry = typeof transferPortalEntries.$inferSelect;
export type InsertTransferPortalEntry = typeof transferPortalEntries.$inferInsert;

// ==================== PLAYBOOKS ====================

export const playbooks = mysqlTable("playbooks", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  sport: varchar("sport", { length: 64 }),
  category: varchar("category", { length: 64 }),
  content: json("content"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Playbook = typeof playbooks.$inferSelect;
export type InsertPlaybook = typeof playbooks.$inferInsert;

// ==================== SUBSCRIPTIONS & PAYMENTS ====================

export const subscriptions = mysqlTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  tierId: varchar("tier_id", { length: 64 }).notNull(),
  tierName: varchar("tier_name", { length: 128 }),
  status: varchar("status", { length: 32 }).default("active").notNull(),
  billingCycle: varchar("billing_cycle", { length: 16 }).default("monthly"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  canceledAt: timestamp("canceled_at"),
  trialStart: timestamp("trial_start"),
  trialEnd: timestamp("trial_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  stripeInvoiceId: varchar("stripe_invoice_id", { length: 255 }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: varchar("status", { length: 32 }).default("pending").notNull(),
  description: text("description"),
  productType: varchar("product_type", { length: 64 }),
  productId: varchar("product_id", { length: 64 }),
  metadata: json("metadata"),
  receiptUrl: text("receipt_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

// ==================== CREDIT SYSTEM ====================

export const userCredits = mysqlTable("user_credits", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull().unique(),
  balance: int("balance").default(0).notNull(),
  lifetimePurchased: int("lifetime_purchased").default(0).notNull(),
  lifetimeUsed: int("lifetime_used").default(0).notNull(),
  lifetimeBonus: int("lifetime_bonus").default(0).notNull(),
  lastRefillAt: timestamp("last_refill_at"),
  nextRefillAt: timestamp("next_refill_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type UserCredits = typeof userCredits.$inferSelect;
export type InsertUserCredits = typeof userCredits.$inferInsert;

export const creditTransactions = mysqlTable("credit_transactions", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  amount: int("amount").notNull(),
  balanceAfter: int("balance_after").notNull(),
  description: text("description"),
  featureUsed: varchar("feature_used", { length: 64 }),
  stripePaymentId: varchar("stripe_payment_id", { length: 255 }),
  referenceId: varchar("reference_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = typeof creditTransactions.$inferInsert;

// ==================== SITE VOTING & COMMUNITY FEEDBACK ====================

export const siteVotes = mysqlTable("site_votes", {
  id: serial("id").primaryKey(),
  visitorId: varchar("visitor_id", { length: 255 }),
  siteChoice: varchar("site_choice", { length: 16 }).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SiteVote = typeof siteVotes.$inferSelect;
export type InsertSiteVote = typeof siteVotes.$inferInsert;

export const communityFeedback = mysqlTable("community_feedback", {
  id: serial("id").primaryKey(),
  feedbackType: varchar("feedback_type", { length: 64 }).notNull(),
  message: text("message"),
  email: varchar("email", { length: 320 }),
  name: varchar("name", { length: 255 }),
  visitorId: varchar("visitor_id", { length: 255 }),
  rating: int("rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CommunityFeedback = typeof communityFeedback.$inferSelect;
export type InsertCommunityFeedback = typeof communityFeedback.$inferInsert;
