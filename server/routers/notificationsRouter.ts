import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { notifications, users } from "../../drizzle/schema";
import { eq, desc, and, count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const notificationsRouter = router({
  getRecent: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, ctx.user.id))
      .orderBy(desc(notifications.createdAt))
      .limit(20);
  }),

  markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { success: false };
    await db
      .update(notifications)
      .set({ isRead: "yes", readAt: new Date() })
      .where(and(eq(notifications.userId, ctx.user.id), eq(notifications.isRead, "no")));
    return { success: true };
  }),

  markRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      await db
        .update(notifications)
        .set({ isRead: "yes", readAt: new Date() })
        .where(and(eq(notifications.id, input.id), eq(notifications.userId, ctx.user.id)));
      return { success: true };
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      message: z.string().optional(),
      type: z.enum(["welcome","vip_approved","system_announcement","custom","credit_added","new_feature","promotion","reminder","achievement","message"]).default("custom"),
      link: z.string().optional(),
      priority: z.enum(["low","normal","high","urgent"]).default("normal"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      await db.insert(notifications).values({
        userId: ctx.user.id,
        title: input.title,
        message: input.message,
        type: input.type,
        link: input.link,
        priority: input.priority,
        isRead: "no",
      });
      return { success: true };
    }),

  // Get unread count for badge
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { count: 0 };
    const result = await db
      .select({ count: count() })
      .from(notifications)
      .where(and(eq(notifications.userId, ctx.user.id), eq(notifications.isRead, "no")));
    return { count: result[0]?.count ?? 0 };
  }),

  // Admin: send notification to a specific user
  sendToUser: protectedProcedure
    .input(z.object({
      userId: z.number(),
      title: z.string(),
      message: z.string().optional(),
      type: z.enum(["welcome","vip_approved","system_announcement","custom","credit_added","new_feature","promotion","reminder","achievement","message"]).default("system_announcement"),
      priority: z.enum(["low","normal","high","urgent"]).default("normal"),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      const db = await getDb();
      if (!db) return { success: false, sent: 0 };
      await db.insert(notifications).values({
        userId: input.userId,
        title: input.title,
        message: input.message,
        type: input.type,
        priority: input.priority,
        isRead: "no",
      });
      return { success: true, sent: 1 };
    }),

  // Admin: broadcast notification to ALL users
  broadcast: protectedProcedure
    .input(z.object({
      title: z.string(),
      message: z.string().optional(),
      type: z.enum(["welcome","vip_approved","system_announcement","custom","credit_added","new_feature","promotion","reminder","achievement","message"]).default("system_announcement"),
      priority: z.enum(["low","normal","high","urgent"]).default("normal"),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      const db = await getDb();
      if (!db) return { success: false, sent: 0 };
      const allUsers = await db.select({ id: users.id }).from(users);
      if (allUsers.length === 0) return { success: true, sent: 0 };
      await db.insert(notifications).values(
        allUsers.map((u: { id: number }) => ({
          userId: u.id,
          title: input.title,
          message: input.message,
          type: input.type,
          priority: input.priority,
          isBroadcast: "yes" as const,
          isRead: "no" as const,
        }))
      );
      return { success: true, sent: allUsers.length };
    }),
});
