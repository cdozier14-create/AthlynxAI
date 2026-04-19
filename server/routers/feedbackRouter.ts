import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import mysql from "mysql2/promise";

let _pool: mysql.Pool | null = null;
async function getPool(): Promise<mysql.Pool> {
  if (!_pool) {
    _pool = mysql.createPool({
      uri: process.env.DATABASE_URL!,
      ssl: { rejectUnauthorized: false },
      connectionLimit: 5,
    });
  }
  return _pool;
}

export const feedbackRouter = router({
  // Submit feedback (public — anyone can submit)
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      email: z.string().email(),
      title: z.string().min(5).max(256),
      body: z.string().min(10).max(2000),
      category: z.enum(["feature_request", "bug_report", "general", "content", "performance"]).default("general"),
    }))
    .mutation(async ({ input }) => {
      const pool = await getPool();
      await pool.execute(
        `INSERT INTO athlete_feedback (name, email, title, body, category) VALUES (?, ?, ?, ?, ?)`,
        [input.name, input.email, input.title, input.body, input.category]
      );
      return { success: true };
    }),

  // List feedback (public)
  list: publicProcedure
    .input(z.object({
      category: z.enum(["all", "feature_request", "bug_report", "general", "content", "performance"]).default("all"),
      sort: z.enum(["newest", "top"]).default("top"),
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      const whereClause = input.category !== "all" ? `WHERE category = ?` : "";
      const params: any[] = input.category !== "all" ? [input.category] : [];
      const orderBy = input.sort === "top" ? "votes DESC, createdAt DESC" : "createdAt DESC";
      params.push(input.limit, input.offset);

      const pool = await getPool();
      // Use query (not execute) so LIMIT/OFFSET integers work correctly
      const limitSafe = Math.min(Math.max(1, input.limit), 50);
      const offsetSafe = Math.max(0, input.offset);
      const catParam = input.category !== "all" ? [input.category] : [];
      const [rows] = await pool.query(
        `SELECT id, name, title, body, category, votes, status, adminReply, repliedAt, createdAt
         FROM athlete_feedback ${whereClause}
         ORDER BY ${orderBy}
         LIMIT ${limitSafe} OFFSET ${offsetSafe}`,
        catParam
      ) as any;

      return { items: rows as any[] };
    }),

  // Vote on feedback (by email/IP identifier)
  vote: publicProcedure
    .input(z.object({
      feedbackId: z.number(),
      voterIdentifier: z.string().min(1).max(320), // email or IP
    }))
    .mutation(async ({ input }) => {
      const pool = await getPool();
      // Check if already voted
      const [existing] = await pool.execute(
        `SELECT id FROM feedback_votes WHERE feedbackId = ? AND voterIdentifier = ?`,
        [input.feedbackId, input.voterIdentifier]
      ) as any;

      if ((existing as any[]).length > 0) {
        return { success: false, message: "Already voted" };
      }

      await pool.execute(
        `INSERT INTO feedback_votes (feedbackId, voterIdentifier) VALUES (?, ?)`,
        [input.feedbackId, input.voterIdentifier]
      );
      await pool.execute(
        `UPDATE athlete_feedback SET votes = votes + 1 WHERE id = ?`,
        [input.feedbackId]
      );
      return { success: true };
    }),

  // Admin: reply to feedback
  adminReply: protectedProcedure
    .input(z.object({
      feedbackId: z.number(),
      reply: z.string().min(1).max(2000),
      status: z.enum(["open", "under_review", "planned", "completed", "declined"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const pool = await getPool();
      await pool.execute(
        `UPDATE athlete_feedback SET adminReply = ?, repliedAt = NOW() ${input.status ? ", status = ?" : ""} WHERE id = ?`,
        input.status ? [input.reply, input.status, input.feedbackId] : [input.reply, input.feedbackId]
      );
      return { success: true };
    }),

  // Admin: update status only
  updateStatus: protectedProcedure
    .input(z.object({
      feedbackId: z.number(),
      status: z.enum(["open", "under_review", "planned", "completed", "declined"]),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const pool = await getPool();
      await pool.execute(
        `UPDATE athlete_feedback SET status = ? WHERE id = ?`,
        [input.status, input.feedbackId]
      );
      return { success: true };
    }),

  // Admin: delete feedback
  delete: protectedProcedure
    .input(z.object({ feedbackId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const pool = await getPool();
      await pool.execute(`DELETE FROM feedback_votes WHERE feedbackId = ?`, [input.feedbackId]);
      await pool.execute(`DELETE FROM athlete_feedback WHERE id = ?`, [input.feedbackId]);
      return { success: true };
    }),
});
