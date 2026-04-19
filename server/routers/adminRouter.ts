import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { users, notifications, broadcastMessages } from "../../drizzle/schema";
import { desc, eq, like, or, sql } from "drizzle-orm";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  getUsers: adminProcedure
    .input(z.object({
      page: z.number().int().min(1).default(1),
      limit: z.number().int().min(1).max(100).default(50),
      search: z.string().optional(),
      sortBy: z.enum(["createdAt", "name", "email", "role"]).default("createdAt"),
      sortDir: z.enum(["asc", "desc"]).default("desc"),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const offset = (input.page - 1) * input.limit;
      let query = db.select({
        id: users.id, name: users.name, email: users.email, role: users.role,
        sport: users.sport, school: users.school, loginMethod: users.loginMethod,
        stripeCustomerId: users.stripeCustomerId, stripeSubscriptionId: users.stripeSubscriptionId,
        stripePlanId: users.stripePlanId, trialEndsAt: users.trialEndsAt,
        credits: users.credits, lastSignedIn: users.lastSignedIn, createdAt: users.createdAt,
      }).from(users).$dynamic();
      if (input.search?.trim()) {
        const term = `%${input.search.trim()}%`;
        query = query.where(or(like(users.name, term), like(users.email, term), like(users.sport, term), like(users.school, term))) as typeof query;
      }
      const col = users[input.sortBy as keyof typeof users] as any;
      query = (input.sortDir === "desc" ? query.orderBy(desc(col)) : query.orderBy(col)) as typeof query;
      let countQuery = db.select({ count: sql<number>`count(*)` }).from(users).$dynamic();
      if (input.search?.trim()) {
        const term = `%${input.search.trim()}%`;
        countQuery = countQuery.where(or(like(users.name, term), like(users.email, term), like(users.sport, term), like(users.school, term))) as typeof countQuery;
      }
      const [rows, countResult] = await Promise.all([query.limit(input.limit).offset(offset), countQuery]);
      const total = Number(countResult[0]?.count ?? 0);
      return { users: rows, total, page: input.page, limit: input.limit, totalPages: Math.ceil(total / input.limit) };
    }),

  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const [total, thisWeek, thisMonth, withSub, onTrial] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.createdAt} >= ${weekAgo}`),
      db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.createdAt} >= ${monthAgo}`),
      db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.stripeSubscriptionId} IS NOT NULL`),
      db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.trialEndsAt} > ${now}`),
    ]);
    return {
      totalUsers: Number(total[0]?.count ?? 0),
      newThisWeek: Number(thisWeek[0]?.count ?? 0),
      newThisMonth: Number(thisMonth[0]?.count ?? 0),
      withSubscription: Number(withSub[0]?.count ?? 0),
      onTrial: Number(onTrial[0]?.count ?? 0),
    };
  }),

  setUserRole: adminProcedure
    .input(z.object({ userId: z.number().int(), role: z.enum(["user", "admin"]) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
      return { success: true };
    }),

  sendBroadcast: adminProcedure
    .input(z.object({
      subject: z.string().min(1).max(256),
      body: z.string().min(1),
      channel: z.enum(["email", "in_app", "both"]).default("in_app"),
      recipientFilter: z.enum(["all", "trial", "subscribed", "free"]).default("all"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const now = new Date();
      let rq = db.select({ id: users.id, name: users.name, email: users.email }).from(users).$dynamic();
      if (input.recipientFilter === "trial") rq = rq.where(sql`${users.trialEndsAt} > ${now}`) as typeof rq;
      else if (input.recipientFilter === "subscribed") rq = rq.where(sql`${users.stripeSubscriptionId} IS NOT NULL`) as typeof rq;
      else if (input.recipientFilter === "free") rq = rq.where(sql`${users.stripeSubscriptionId} IS NULL AND (${users.trialEndsAt} IS NULL OR ${users.trialEndsAt} <= ${now})`) as typeof rq;
      const recipients = await rq;

      if (input.channel === "in_app" || input.channel === "both") {
        const rows = recipients.map((u: { id: number; name: string; email: string }) => ({
          userId: u.id, type: "custom" as const, title: input.subject, message: input.body,
          priority: "normal" as const, isBroadcast: "yes" as const, isRead: "no" as const, isDismissed: "no" as const,
        }));
        for (let i = 0; i < rows.length; i += 100) await db.insert(notifications).values(rows.slice(i, i + 100));
      }

      await db.insert(broadcastMessages).values({
        senderId: ctx.user.id, subject: input.subject, body: input.body,
        channel: input.channel, recipientFilter: input.recipientFilter,
        recipientCount: recipients.length, status: "sent",
      });
      return { success: true, recipientCount: recipients.length };
    }),

  getBroadcasts: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
    return db.select().from(broadcastMessages).orderBy(desc(broadcastMessages.createdAt)).limit(50);
  }),
});
