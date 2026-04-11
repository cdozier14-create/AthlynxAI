import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { createCheckoutSession, getOrCreateCustomer } from "./stripe/checkout";
import { SUBSCRIPTION_TIERS, ONE_TIME_PRODUCTS, getTiersForRole } from "./stripe/products";
import { sendEmail, sendCustomEmail, sendTeamEmail, EMAIL_TEMPLATES } from "./services/email";
import { sendVerificationCode, verifyCode } from "./services/verification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== VIP CODES ====================
  vip: router({
    validate: publicProcedure
      .input(z.object({ code: z.string() }))
      .mutation(async ({ input }) => {
        const vipCode = await db.validateVipCode(input.code);
        if (!vipCode) {
          return { valid: false, error: "Invalid or expired VIP code" };
        }
        return { valid: true, code: vipCode };
      }),
    
    redeem: protectedProcedure
      .input(z.object({ code: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const vipCode = await db.validateVipCode(input.code);
        if (!vipCode) {
          return { success: false, error: "Invalid or expired VIP code" };
        }
        await db.useVipCode(input.code);
        return { success: true };
      }),
  }),

  // ==================== VERIFICATION ====================
  verification: router({    sendCode: publicProcedure
      .input(z.object({
        email: z.string().email(),
        phone: z.string().optional(),
        type: z.enum(["signup", "login", "password_reset"]).default("signup"),
      }))
      .mutation(async ({ input }) => {
        return sendVerificationCode(input.email, input.phone, input.type);
      }),
    
    verifyCode: publicProcedure
      .input(z.object({
        email: z.string().email(),
        code: z.string(),
      }))
      .mutation(async ({ input }) => {
        return verifyCode(input.email, input.code);
      }),
  }),

  // ==================== WAITLIST ====================
  waitlist: router({
    join: publicProcedure
      .input(z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        role: z.enum(["athlete", "parent", "coach", "brand"]),
        sport: z.string().optional(),
        referralCode: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.addToWaitlist(input);
      }),
    
    count: publicProcedure.query(async () => {
      return db.getWaitlistCount();
    }),
  }),

  // ==================== SOCIAL FEED ====================
  feed: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }).optional())
      .query(async ({ input }) => {
        return db.getFeed(input?.limit || 20, input?.offset || 0);
      }),
    
    userPosts: publicProcedure
      .input(z.object({ userId: z.number(), limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ input }) => {
        return db.getUserPosts(input.userId, input.limit, input.offset);
      }),
    
    create: protectedProcedure
      .input(z.object({
        content: z.string().optional(),
        mediaUrls: z.array(z.string()).optional(),
        postType: z.enum(["text", "image", "video", "highlight", "deal", "announcement"]).default("text"),
        visibility: z.enum(["public", "followers", "private"]).default("public"),
      }))
      .mutation(async ({ input, ctx }) => {
        const postId = await db.createPost({
          userId: ctx.user.id,
          content: input.content,
          mediaUrls: input.mediaUrls,
          postType: input.postType,
          visibility: input.visibility,
        });
        return { success: true, postId };
      }),
    
    like: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await db.likePost(ctx.user.id, input.postId);
        return { success: true };
      }),
    
    unlike: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await db.unlikePost(ctx.user.id, input.postId);
        return { success: true };
      }),
  }),

  // ==================== ATHLETE PROFILE ====================
  athlete: router({
    profile: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getAthleteProfile(input.userId);
      }),
    
    myProfile: protectedProcedure.query(async ({ ctx }) => {
      return db.getAthleteProfile(ctx.user.id);
    }),
    
    updateProfile: protectedProcedure
      .input(z.object({
        sport: z.string().optional(),
        position: z.string().optional(),
        school: z.string().optional(),
        graduationYear: z.number().optional(),
        gpa: z.string().optional(),
        height: z.string().optional(),
        weight: z.string().optional(),
        stats: z.any().optional(),
        highlights: z.array(z.string()).optional(),
        socialLinks: z.any().optional(),
        transferStatus: z.enum(["not_in_portal", "exploring", "in_portal", "committed"]).optional(),
        nilStatus: z.enum(["not_available", "available", "active_deals"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.upsertAthleteProfile({
          userId: ctx.user.id,
          ...input,
        });
        return { success: true };
      }),
  }),

  // ==================== FOLLOWS ====================
  social: router({
    follow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await db.followUser(ctx.user.id, input.userId);
        return { success: true };
      }),
    
    unfollow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await db.unfollowUser(ctx.user.id, input.userId);
        return { success: true };
      }),
    
    followers: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getFollowers(input.userId);
      }),
    
    following: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getFollowing(input.userId);
      }),
  }),

  // ==================== MESSAGES ====================
  messages: router({
    conversations: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserConversations(ctx.user.id);
    }),
    
    list: protectedProcedure
      .input(z.object({ conversationId: z.number(), limit: z.number().default(50), offset: z.number().default(0) }))
      .query(async ({ input }) => {
        return db.getMessages(input.conversationId, input.limit, input.offset);
      }),
    
    send: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        content: z.string().optional(),
        mediaUrl: z.string().optional(),
        messageType: z.enum(["text", "image", "video", "file", "system"]).default("text"),
      }))
      .mutation(async ({ input, ctx }) => {
        const messageId = await db.sendMessage({
          conversationId: input.conversationId,
          senderId: ctx.user.id,
          content: input.content,
          mediaUrl: input.mediaUrl,
          messageType: input.messageType,
        });
        return { success: true, messageId };
      }),
  }),

  // ==================== NOTIFICATIONS ====================
  notifications: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }).optional())
      .query(async ({ input, ctx }) => {
        return db.getUserNotifications(ctx.user.id, input?.limit || 20);
      }),
    
    markRead: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ input }) => {
        await db.markNotificationRead(input.notificationId);
        return { success: true };
      }),
  }),

  // ==================== TRANSFER PORTAL ====================
  transferPortal: router({
    // Get players with filters
    players: publicProcedure
      .input(z.object({
        sport: z.string().optional(),
        position: z.string().optional(),
        division: z.string().optional(),
        conference: z.string().optional(),
        status: z.string().optional(),
        minRating: z.number().optional(),
        maxRating: z.number().optional(),
        minNIL: z.number().optional(),
        maxNIL: z.number().optional(),
        search: z.string().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }).optional())
      .query(async ({ input }) => {
        return db.getTransferPortalEntries(input?.sport, input?.limit || 50, input?.offset || 0);
      }),
    
    // Get single player
    player: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getTransferPortalEntries(undefined, 1, 0);
      }),
    
    // Get portal stats
    stats: publicProcedure.query(async () => {
      return { totalPlayers: 0, bySport: {}, byStatus: {} };
    }),
  }),

  // ==================== CRM & ANALYTICS (FAILPROOF) ====================
  crm: router({
    // Track signup with full analytics
    trackSignup: publicProcedure
      .input(z.object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        role: z.string().optional(),
        sport: z.string().optional(),
        referralSource: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        signupType: z.enum(["waitlist", "vip", "direct", "referral"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Get IP from request headers
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || 
                          ctx.req.headers["x-real-ip"]?.toString() || 
                          ctx.req.socket?.remoteAddress || "unknown";
        const userAgent = ctx.req.headers["user-agent"] || "";
        
        const count = await db.getWaitlistCount();
        await db.trackSignup({
          ...input,
          signupNumber: count + 1,
          ipAddress,
          userAgent,
        });
        return { success: true };
      }),
    
    // Get real-time stats for dashboard
    stats: publicProcedure.query(async () => {
      return db.getCRMStats();
    }),
    
    // Get signup list with pagination
    signups: publicProcedure
      .input(z.object({ 
        limit: z.number().default(100), 
        offset: z.number().default(0),
        accessCode: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        // Validate partner access if code provided
        if (input?.accessCode) {
          const partner = await db.validatePartnerAccess(input.accessCode);
          if (!partner) {
            return { signups: [], total: 0, error: "Invalid access code" };
          }
        }
        return db.getSignupAnalytics(input?.limit || 100, input?.offset || 0);
      }),
    
    // Export to CSV for Excel/Copilot
    exportCSV: publicProcedure
      .input(z.object({ accessCode: z.string() }))
      .query(async ({ input }) => {
        const partner = await db.validatePartnerAccess(input.accessCode);
        if (!partner) {
          return { csv: "", error: "Invalid access code" };
        }
        const csv = await db.exportSignupsToCSV();
        return { csv };
      }),
    
    // Track customer event
    trackEvent: publicProcedure
      .input(z.object({
        userId: z.number().optional(),
        waitlistId: z.number().optional(),
        eventType: z.string(),
        eventName: z.string(),
        eventData: z.any().optional(),
        pageUrl: z.string().optional(),
        referrer: z.string().optional(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || "unknown";
        const userAgent = ctx.req.headers["user-agent"] || "";
        
        return db.trackCustomerEvent({
          ...input,
          ipAddress,
          userAgent,
        });
      }),
    
    // Get milestones
    milestones: publicProcedure.query(async () => {
      return db.getMilestones();
    }),
    
    // Validate partner access
    validateAccess: publicProcedure
      .input(z.object({ accessCode: z.string() }))
      .query(async ({ input }) => {
        const partner = await db.validatePartnerAccess(input.accessCode);
        return { valid: !!partner, partner };
      }),
  }),

  // ==================== COMMUNITY VOTING & FEEDBACK ====================
  community: router({
    // Submit a vote for Site A or Site B
    vote: publicProcedure
      .input(z.object({
        votedFor: z.enum(["site_a", "site_b"]),
        email: z.string().email().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || ctx.req.socket.remoteAddress || "";
        const userAgent = ctx.req.headers["user-agent"] || "";
        
        await db.submitSiteVote({
          siteChoice: input.votedFor,
          visitorId: input.email,
          ipAddress,
          userAgent,
        });
        return { success: true };
      }),
    
    // Get vote counts
    voteStats: publicProcedure.query(async () => {
      return db.getVoteStats();
    }),
    
    // Submit community feedback
    submitFeedback: publicProcedure
      .input(z.object({
        email: z.string().email().optional(),
        name: z.string().optional(),
        whatTheyLove: z.string().optional(),
        whatCouldBeBetter: z.string().optional(),
        siteVersion: z.enum(["site_a", "site_b", "both", "general"]).optional(),
        overallRating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || ctx.req.socket.remoteAddress || "";
        const userAgent = ctx.req.headers["user-agent"] || "";
        const pageUrl = ctx.req.headers.referer || "";
        
        await db.submitCommunityFeedback({
          feedbackType: input.siteVersion || 'general',
          message: `Love: ${input.whatTheyLove || 'N/A'} | Better: ${input.whatCouldBeBetter || 'N/A'} | Rating: ${input.overallRating || 'N/A'}`,
          email: input.email,
          name: input.name,
          visitorId: userAgent,
        });
        return { success: true };
      }),
    
    // Get all feedback (for admin/CRM)
    feedback: publicProcedure
      .input(z.object({
        accessCode: z.string(),
        limit: z.number().default(100),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const partner = await db.validatePartnerAccess(input.accessCode);
        if (!partner) {
          return { feedback: [], total: 0, error: "Invalid access code" };
        }
        return db.getCommunityFeedback(input.limit);
      }),
  }),

  // ==================== STRIPE PAYMENTS ====================
  stripe: router({
    // Get available tiers for a role
    getTiers: publicProcedure
      .input(z.object({ role: z.enum(["athlete", "brand", "parent", "coach"]) }))
      .query(({ input }) => {
        return getTiersForRole(input.role);
      }),
    
    // Get all subscription tiers
    allTiers: publicProcedure.query(() => {
      return SUBSCRIPTION_TIERS;
    }),
    
    // Get one-time products
    products: publicProcedure.query(() => {
      return ONE_TIME_PRODUCTS;
    }),
    
    // Create checkout session for subscription
    createCheckout: protectedProcedure
      .input(z.object({
        tierId: z.string().optional(),
        productId: z.string().optional(),
        billingCycle: z.enum(["monthly", "yearly"]).default("monthly"),
      }))
      .mutation(async ({ input, ctx }) => {
        const origin = ctx.req.headers.origin || ctx.req.headers.host || "https://athlynx.ai";
        
        const result = await createCheckoutSession({
          userId: ctx.user.id,
          userEmail: ctx.user.email || "",
          userName: ctx.user.name || "",
          tierId: input.tierId,
          productId: input.productId,
          billingCycle: input.billingCycle,
          origin: origin.startsWith("http") ? origin : `https://${origin}`,
        });
        
        return result;
      }),
    
    // Create customer portal session for subscription management
    createPortal: protectedProcedure
      .mutation(async ({ ctx }) => {
        const origin = ctx.req.headers.origin || ctx.req.headers.host || "https://athlynx.ai";
        const returnUrl = origin.startsWith("http") ? `${origin}/portal` : `https://${origin}/portal`;
        
        // Get or create Stripe customer
        const customerId = await getOrCreateCustomer(
          ctx.user.id,
          ctx.user.email || "",
          ctx.user.name || ""
        );
        
        const { createPortalSession } = await import("./stripe/checkout");
        const url = await createPortalSession(customerId, returnUrl);
        
        return { url };
      }),
  }),

  // ==================== EMAIL SYSTEM ====================
  email: router({
    // Get available templates
    templates: publicProcedure.query(() => {
      return Object.keys(EMAIL_TEMPLATES);
    }),
    
    // Send welcome email
    sendWelcome: protectedProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string(),
      }))
      .mutation(async ({ input }) => {
        return sendEmail(input.email, "welcome", { name: input.name });
      }),
    
    // Send team notification (requires partner access)
    sendTeamNotification: publicProcedure
      .input(z.object({
        accessCode: z.string(),
        subject: z.string(),
        message: z.string(),
        recipients: z.array(z.string().email()),
      }))
      .mutation(async ({ input }) => {
        const partner = await db.validatePartnerAccess(input.accessCode);
        if (!partner) {
          return { success: false, error: "Invalid access code" };
        }
        return sendTeamEmail(
          input.subject,
          input.message,
          partner.name || partner.partnerName,
          input.recipients
        );
      }),
    
    // Send custom email (requires partner access)
    sendCustom: publicProcedure
      .input(z.object({
        accessCode: z.string(),
        to: z.union([z.string().email(), z.array(z.string().email())]),
        subject: z.string(),
        htmlContent: z.string(),
        textContent: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const partner = await db.validatePartnerAccess(input.accessCode);
        if (!partner) {
          return { success: false, error: "Invalid access code" };
        }
        return sendCustomEmail(
          input.to,
          input.subject,
          input.htmlContent,
          input.textContent
        );
      }),
    
    // Send partner invite
    sendPartnerInvite: publicProcedure
      .input(z.object({
        accessCode: z.string(),
        email: z.string().email(),
        name: z.string(),
        newAccessCode: z.string(),
        role: z.string(),
      }))
      .mutation(async ({ input }) => {
        const partner = await db.validatePartnerAccess(input.accessCode);
        if (!partner) {
          return { success: false, error: "Invalid access code" };
        }
        return sendEmail(input.email, "partnerInvite", {
          name: input.name,
          accessCode: input.newAccessCode,
          role: input.role,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;

