import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { athleteProfiles, users } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const profileRouter = router({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const profile = await db
      .select()
      .from(athleteProfiles)
      .where(eq(athleteProfiles.userId, ctx.user.id))
      .limit(1);
    return profile[0] ?? null;
  }),

  getProfile: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const [profile] = await db
        .select({
          id: athleteProfiles.id,
          userId: athleteProfiles.userId,
          sport: athleteProfiles.sport,
          position: athleteProfiles.position,
          school: athleteProfiles.school,
          height: athleteProfiles.height,
          weight: athleteProfiles.weight,
          gpa: athleteProfiles.gpa,
          classYear: athleteProfiles.classYear,
          state: athleteProfiles.state,
          bio: athleteProfiles.bio,
          recruitingStatus: athleteProfiles.recruitingStatus,
          nilValue: athleteProfiles.nilValue,
          coverUrl: athleteProfiles.coverUrl,
          highlightUrl: athleteProfiles.highlightUrl,
          instagram: athleteProfiles.instagram,
          twitter: athleteProfiles.twitter,
          followers: athleteProfiles.followers,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl,
          stripePlanId: users.stripePlanId,
        })
        .from(athleteProfiles)
        .leftJoin(users, eq(athleteProfiles.userId, users.id))
        .where(eq(athleteProfiles.userId, input.userId))
        .limit(1);
      return profile ?? null;
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      sport: z.string().optional(),
      position: z.string().optional(),
      school: z.string().optional(),
      height: z.string().optional(),
      weight: z.number().optional(),
      gpa: z.number().min(0).max(4).optional(),
      classYear: z.string().optional(),
      state: z.string().optional(),
      bio: z.string().max(500).optional(),
      recruitingStatus: z.enum(["available", "committed", "signed", "transferred"]).optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      followers: z.number().optional(),
      coverUrl: z.string().optional(),
      highlightUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const existing = await db
        .select({ id: athleteProfiles.id })
        .from(athleteProfiles)
        .where(eq(athleteProfiles.userId, ctx.user.id))
        .limit(1);

      const profileData = {
        sport: input.sport,
        position: input.position,
        school: input.school,
        height: input.height,
        weight: input.weight,
        gpa: input.gpa,
        classYear: input.classYear,
        state: input.state,
        bio: input.bio,
        recruitingStatus: input.recruitingStatus,
        instagram: input.instagram,
        twitter: input.twitter,
        followers: input.followers,
        coverUrl: input.coverUrl,
        highlightUrl: input.highlightUrl,
      };
      if (existing.length > 0) {
        await db.update(athleteProfiles).set(profileData).where(eq(athleteProfiles.userId, ctx.user.id));
      } else {
        await db.insert(athleteProfiles).values({ userId: ctx.user.id, ...profileData });
      }

      // Calculate NIL value based on followers and sport
      const followers = input.followers ?? 0;
      const nilValue = Math.floor(followers * 0.05 + (input.gpa ?? 0) * 1000);
      if (nilValue > 0) {
        await db.update(athleteProfiles)
          .set({ nilValue })
          .where(eq(athleteProfiles.userId, ctx.user.id));
      }

      return { success: true };
    }),

  updateAvatar: protectedProcedure
    .input(z.object({ avatarUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.update(users).set({ avatarUrl: input.avatarUrl }).where(eq(users.id, ctx.user.id));
      return { success: true };
    }),

  browseAthletes: publicProcedure
    .input(z.object({
      sport: z.string().optional(),
      position: z.string().optional(),
      school: z.string().optional(),
      recruitingStatus: z.string().optional(),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const query = db
        .select({
          id: athleteProfiles.id,
          userId: athleteProfiles.userId,
          sport: athleteProfiles.sport,
          position: athleteProfiles.position,
          school: athleteProfiles.school,
          classYear: athleteProfiles.classYear,
          state: athleteProfiles.state,
          recruitingStatus: athleteProfiles.recruitingStatus,
          nilValue: athleteProfiles.nilValue,
          followers: athleteProfiles.followers,
          name: users.name,
          avatarUrl: users.avatarUrl,
        })
        .from(athleteProfiles)
        .leftJoin(users, eq(athleteProfiles.userId, users.id))
        .limit(input.limit);
      return query;
    }),

  saveOnboarding: protectedProcedure
    .input(z.object({
      role: z.string(),
      data: z.record(z.string(), z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Save onboarding data to users table
      await db.update(users)
        .set({
          onboardingRole: input.role,
          onboardingData: JSON.stringify(input.data),
          onboardingCompleted: 1,
          sport: input.data.sport ?? undefined,
          school: input.data.school ?? undefined,
        })
        .where(eq(users.id, ctx.user.id));
      // Also update athlete profile if role is athlete
      if (input.role === "athlete") {
        const existing = await db.select({ id: athleteProfiles.id }).from(athleteProfiles).where(eq(athleteProfiles.userId, ctx.user.id)).limit(1);
        const profileData = {
          sport: input.data.sport || null,
          position: input.data.position || null,
          school: input.data.school || null,
          classYear: input.data.graduation_year || null,
          state: input.data.location || null,
          recruitingStatus: input.data.recruiting_status || null,
          gpa: input.data.gpa ? parseFloat(input.data.gpa) : null,
          instagram: input.data.instagram || null,
          twitter: input.data.twitter || null,
          highlightUrl: input.data.highlight_reel || null,
        };
        if (existing.length > 0) {
          await db.update(athleteProfiles).set(profileData).where(eq(athleteProfiles.userId, ctx.user.id));
        } else {
          await db.insert(athleteProfiles).values({ userId: ctx.user.id });
          await db.update(athleteProfiles).set(profileData).where(eq(athleteProfiles.userId, ctx.user.id));
        }
      }
      return { success: true };
    }),

  getOnboardingStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { completed: false, role: null };
    const [user] = await db
      .select({ onboardingCompleted: sql<number>`onboardingCompleted`, onboardingRole: sql<string>`onboardingRole` })
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);
    return {
      completed: (user?.onboardingCompleted ?? 0) === 1,
      role: user?.onboardingRole ?? null,
    };
  }),
});
