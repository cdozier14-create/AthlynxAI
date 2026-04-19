import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sendVerificationCode, verifyCode } from "../services/verification";

export const verificationRouter = router({
  sendCode: publicProcedure
    .input(z.object({
      email: z.string().email(),
      phone: z.string().optional(),
      type: z.enum(["signup", "login", "password_reset"]).default("signup"),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const result = await sendVerificationCode(input.email, input.phone, input.type, input.name);
      return { success: result.success, error: result.error };
    }),

  verifyCode: publicProcedure
    .input(z.object({
      email: z.string().email(),
      code: z.string(),
    }))
    .mutation(async ({ input }) => {
      const result = await verifyCode(input.email, input.code);
      return { valid: result.valid, error: result.error };
    }),
});
