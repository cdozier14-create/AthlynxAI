import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { waitlist } from "../../drizzle/schema";
import { sendWelcomeEmail } from "../services/aws-ses";
import { eq } from "drizzle-orm";

export const waitlistRouter = router({
  join: publicProcedure
    .input(z.object({
      fullName: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      role: z.enum(["athlete", "parent", "coach", "brand", "scout", "agent"]).default("athlete"),
      sport: z.string().optional(),
      referralCode: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      console.log("[Waitlist] New MVP signup:", input.email, input.role);

      // Store to waitlist table (upsert by email)
      const db = await getDb();
      if (db) {
        try {
          const existing = await db.select().from(waitlist).where(eq(waitlist.email, input.email)).limit(1);
          if (existing.length === 0) {
            await db.insert(waitlist).values({
              email: input.email,
              name: input.fullName,
              sport: input.sport ?? null,
              phone: input.phone ?? null,
              role: input.role,
            });
            console.log("[Waitlist] Saved to DB:", input.email);
          } else {
            console.log("[Waitlist] Already in DB:", input.email);
          }
        } catch (dbErr) {
          console.warn("[Waitlist] DB save failed:", dbErr);
        }
      }

      // Send welcome email
      try {
        await sendWelcomeEmail(input.email, input.fullName);
        console.log("[Waitlist] Welcome email sent to", input.email);
      } catch (emailErr) {
        console.warn("[Waitlist] Welcome email failed:", emailErr);
      }

      return {
        success: true,
        position: Math.floor(Math.random() * 500) + 1,
        message: `Welcome to ATHLYNX, ${input.fullName}! Your 7-day free trial is now active.`,
        error: null,
      };
    }),

  count: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { count: 0 };
    const { users } = await import("../../drizzle/schema");
    const { count } = await import("drizzle-orm");
    const result = await db.select({ total: count() }).from(users);
    return { count: result[0]?.total ?? 0 };
  }),
});
