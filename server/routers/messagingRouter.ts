/**
 * Messaging Router — ATHLYNX
 * Handles email verification codes and custom emails (SMS handled by Auth0)
 */
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { sendVerificationCode, verifyCode } from "../services/verification";
import { sendEmail as sendSESEmail } from "../services/aws-ses";
import { TRPCError } from "@trpc/server";

export const messagingRouter = router({
  /**
   * Send a verification code via email and/or SMS
   */
  sendVerificationCode: protectedProcedure
    .input(z.object({
      phone: z.string().optional(),
      type: z.enum(["signup", "login", "password_reset"]).default("signup"),
    }))
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user.email;
      if (!email) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No email on your account" });
      }
      const result = await sendVerificationCode(email, input.phone, input.type);
      if (!result.success) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: result.error ?? "Failed to send code" });
      }
      return { emailSent: result.emailSent ?? false, smsSent: false };
    }),

  /**
   * Verify a code submitted by the user
   */
  verifyCode: protectedProcedure
    .input(z.object({ code: z.string().min(4).max(8) }))
    .mutation(async ({ ctx, input }) => {
      const email = ctx.user.email;
      if (!email) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No email on your account" });
      }
      const result = await verifyCode(email, input.code);
      if (!result.valid) {
        throw new TRPCError({ code: "BAD_REQUEST", message: result.error ?? "Invalid or expired code" });
      }
      return { verified: true };
    }),

  /**
   * Send a custom email (athlete or admin use)
   */
  sendEmail: protectedProcedure
    .input(z.object({
      to: z.string().email(),
      subject: z.string().min(1),
      body: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      await sendSESEmail({ to: input.to, subject: input.subject, html: `<p>${input.body.replace(/\n/g, '<br>')}</p>`, text: input.body });
      return { sent: true };
    }),

});
