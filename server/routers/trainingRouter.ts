import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { trainingLogs } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const trainingRouter = router({
  logWorkout: protectedProcedure
    .input(z.object({
      workout: z.string().min(1).max(128),
      duration: z.number().min(1).max(600).optional(),
      notes: z.string().max(1000).optional(),
      performance: z.number().min(1).max(10).optional(),
      logDate: z.date().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.insert(trainingLogs).values({
        userId: ctx.user.id,
        workout: input.workout,
        duration: input.duration,
        notes: input.notes,
        performance: input.performance,
        logDate: input.logDate ?? new Date(),
      });
      return { success: true };
    }),

  getHistory: protectedProcedure
    .input(z.object({ limit: z.number().default(30) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(trainingLogs)
        .where(eq(trainingLogs.userId, ctx.user.id))
        .orderBy(desc(trainingLogs.logDate))
        .limit(input.limit);
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { totalSessions: 0, totalMinutes: 0, avgPerformance: 0, streak: 0 };
    const logs = await db
      .select()
      .from(trainingLogs)
      .where(eq(trainingLogs.userId, ctx.user.id))
      .orderBy(desc(trainingLogs.logDate));

    const totalSessions = logs.length;
    const totalMinutes = logs.reduce((sum: number, l: typeof logs[0]) => sum + (l.duration ?? 0), 0);
    const avgPerformance = logs.length > 0
      ? Math.round(logs.reduce((sum: number, l: typeof logs[0]) => sum + (l.performance ?? 0), 0) / logs.length * 10) / 10
      : 0;

    return { totalSessions, totalMinutes, avgPerformance, streak: Math.min(totalSessions, 7) };
  }),
});
