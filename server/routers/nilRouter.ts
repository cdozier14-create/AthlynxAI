import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { nilDeals, transferPortalEntries, athleteProfiles, users } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const nilRouter = router({
  // NIL Deals
  getMyDeals: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(nilDeals)
      .where(eq(nilDeals.athleteId, ctx.user.id))
      .orderBy(desc(nilDeals.createdAt));
  }),

  getAllDeals: publicProcedure
    .input(z.object({
      status: z.enum(["pending", "active", "completed", "declined"]).optional(),
      category: z.string().optional(),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select({
          id: nilDeals.id,
          brandName: nilDeals.brandName,
          dealValue: nilDeals.dealValue,
          status: nilDeals.status,
          description: nilDeals.description,
          category: nilDeals.category,
          startDate: nilDeals.startDate,
          endDate: nilDeals.endDate,
          athleteName: users.name,
          athleteAvatar: users.avatarUrl,
        })
        .from(nilDeals)
        .leftJoin(users, eq(nilDeals.athleteId, users.id))
        .limit(input.limit)
        .orderBy(desc(nilDeals.createdAt));
    }),

  createDeal: protectedProcedure
    .input(z.object({
      brandName: z.string().min(1).max(128),
      dealValue: z.number().min(0),
      description: z.string().optional(),
      category: z.string().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.insert(nilDeals).values({
        athleteId: ctx.user.id,
        brandName: input.brandName,
        dealValue: input.dealValue,
        description: input.description,
        category: input.category,
        startDate: input.startDate,
        endDate: input.endDate,
      });
      return { success: true };
    }),

  updateDealStatus: protectedProcedure
    .input(z.object({
      dealId: z.number(),
      status: z.enum(["pending", "active", "completed", "declined"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.update(nilDeals)
        .set({ status: input.status })
        .where(eq(nilDeals.id, input.dealId));
      return { success: true };
    }),

  calculateNilValue: publicProcedure
    .input(z.object({
      sport: z.string(),
      followers: z.number(),
      gpa: z.number().optional(),
      school: z.string().optional(),
      classYear: z.string().optional(),
    }))
    .query(({ input }) => {
      // NIL value formula
      const sportMultipliers: Record<string, number> = {
        football: 2.5, basketball: 2.2, baseball: 1.5, soccer: 1.3,
        volleyball: 1.2, softball: 1.1, track: 1.0, swimming: 0.9,
        wrestling: 0.9, tennis: 0.8,
      };
      const multiplier = sportMultipliers[input.sport.toLowerCase()] ?? 1.0;
      const followerValue = input.followers * 0.05 * multiplier;
      const gpaBonus = (input.gpa ?? 0) * 500;
      const classBonus = input.classYear === "Freshman" ? 500 :
        input.classYear === "Sophomore" ? 750 :
        input.classYear === "Junior" ? 1000 : 1250;
      const total = Math.floor(followerValue + gpaBonus + classBonus);
      return {
        estimatedValue: total,
        breakdown: {
          followerValue: Math.floor(followerValue),
          gpaBonus: Math.floor(gpaBonus),
          classBonus,
          sportMultiplier: multiplier,
        },
      };
    }),

  // Transfer Portal
  getTransferEntries: publicProcedure
    .input(z.object({
      sport: z.string().optional(),
      status: z.enum(["entered", "committed", "withdrawn"]).optional(),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select({
          id: transferPortalEntries.id,
          fromSchool: transferPortalEntries.fromSchool,
          toSchool: transferPortalEntries.toSchool,
          status: transferPortalEntries.status,
          eligibilityYears: transferPortalEntries.eligibilityYears,
          enteredAt: transferPortalEntries.enteredAt,
          sport: athleteProfiles.sport,
          position: athleteProfiles.position,
          athleteName: users.name,
          athleteAvatar: users.avatarUrl,
          nilValue: athleteProfiles.nilValue,
        })
        .from(transferPortalEntries)
        .leftJoin(athleteProfiles, eq(transferPortalEntries.athleteId, athleteProfiles.userId))
        .leftJoin(users, eq(transferPortalEntries.athleteId, users.id))
        .limit(input.limit)
        .orderBy(desc(transferPortalEntries.enteredAt));
    }),

  enterTransferPortal: protectedProcedure
    .input(z.object({
      fromSchool: z.string(),
      eligibilityYears: z.number().min(0).max(5).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.insert(transferPortalEntries).values({
        athleteId: ctx.user.id,
        fromSchool: input.fromSchool,
        eligibilityYears: input.eligibilityYears,
        status: "entered",
      });
      return { success: true };
    }),
});
