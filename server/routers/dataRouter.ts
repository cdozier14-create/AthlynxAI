import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { athleteDataEvents, athleteDataSources } from "../../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

// ─── Data Ingestion Router ────────────────────────────────────────────────────
// Handles real-time data streaming from AI bots, robots, and wearables
export const dataRouter = router({

  // Public endpoint for device/bot data ingestion (authenticated by API key in payload)
  ingestEvent: publicProcedure
    .input(z.object({
      sourceType: z.enum(["ai_bot", "robot", "wearable", "video_analysis", "manual", "api_integration"]),
      eventType: z.enum([
        "performance_metric", "biometric", "gps_tracking", "motion_capture",
        "ai_session", "recruitment_interaction", "training_session", "health_record",
        "game_stat", "combine_result", "injury_report", "recovery_score"
      ]),
      athleteId: z.number().optional(),
      sport: z.string().optional(),
      sessionId: z.string().optional(),
      payload: z.record(z.string(), z.unknown()),
      heartRate: z.number().optional(),
      speed: z.number().optional(),
      distance: z.number().optional(),
      acceleration: z.number().optional(),
      recoveryScore: z.number().optional(),
      aiConfidence: z.number().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      deviceTimestamp: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const event = await db.insert(athleteDataEvents).values({
        athleteId: input.athleteId,
        sourceType: input.sourceType,
        eventType: input.eventType,
        sport: input.sport,
        sessionId: input.sessionId,
        payload: input.payload,
        heartRate: input.heartRate,
        speed: input.speed,
        distance: input.distance,
        acceleration: input.acceleration,
        recoveryScore: input.recoveryScore,
        aiConfidence: input.aiConfidence,
        latitude: input.latitude,
        longitude: input.longitude,
        deviceTimestamp: input.deviceTimestamp ? new Date(input.deviceTimestamp) : undefined,
        processedAt: new Date(),
      });
      return { success: true, eventId: (event as any).insertId };
    }),

  // Get recent data events for an athlete (protected)
  getMyEvents: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      sport: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const conditions = [eq(athleteDataEvents.athleteId, ctx.user.id)];
      if (input.sport) conditions.push(eq(athleteDataEvents.sport, input.sport));
      const events = await db
        .select()
        .from(athleteDataEvents)
        .where(and(...conditions))
        .orderBy(desc(athleteDataEvents.createdAt))
        .limit(input.limit);
      return events;
    }),

  // Get platform-wide data stats (admin only, used for investor dashboard)
  getPlatformStats: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      const [totalEvents] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(athleteDataEvents);

      const [aiEvents] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(athleteDataEvents)
        .where(eq(athleteDataEvents.sourceType, "ai_bot"));

      const [robotEvents] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(athleteDataEvents)
        .where(eq(athleteDataEvents.sourceType, "robot"));

      const [wearableEvents] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(athleteDataEvents)
        .where(eq(athleteDataEvents.sourceType, "wearable"));

      const recentEvents = await db
        .select()
        .from(athleteDataEvents)
        .orderBy(desc(athleteDataEvents.createdAt))
        .limit(20);

      return {
        totalEvents: Number(totalEvents?.count ?? 0),
        aiEvents: Number(aiEvents?.count ?? 0),
        robotEvents: Number(robotEvents?.count ?? 0),
        wearableEvents: Number(wearableEvents?.count ?? 0),
        recentEvents,
      };
    }),

  // Get data sources (registered devices/bots)
  getSources: protectedProcedure
    .query(async () => {
      const db = await getDb();
      return db.select().from(athleteDataSources).orderBy(desc(athleteDataSources.createdAt));
    }),

  // Register a new data source (robot, wearable, bot)
  registerSource: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      sourceType: z.enum(["ai_bot", "robot", "wearable", "video_analysis", "manual", "api_integration"]),
      deviceId: z.string().optional(),
      firmwareVersion: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const result = await db.insert(athleteDataSources).values({
        name: input.name,
        sourceType: input.sourceType,
        deviceId: input.deviceId,
        firmwareVersion: input.firmwareVersion,
        isActive: true,
        lastSeenAt: new Date(),
      });
      return { success: true, sourceId: (result as any).insertId };
    }),
});
