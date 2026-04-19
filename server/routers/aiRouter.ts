import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

export const aiRouter = router({
  // AI SALES — Brand pitch & deal analysis
  generateBrandPitch: protectedProcedure
    .input(z.object({
      athleteName: z.string(),
      sport: z.string(),
      school: z.string().optional(),
      followers: z.number().optional(),
      brandName: z.string(),
      brandCategory: z.string(),
      dealValue: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are an elite NIL (Name, Image, Likeness) deal strategist for college athletes. 
You write compelling, professional brand partnership pitches that convert. 
Keep responses concise, punchy, and results-focused. Format with clear sections.`,
          },
          {
            role: "user",
            content: `Write a professional brand partnership pitch for:
- Athlete: ${input.athleteName}
- Sport: ${input.sport}
- School: ${input.school ?? "College Athlete"}
- Social Following: ${input.followers?.toLocaleString() ?? "Growing"} followers
- Brand: ${input.brandName} (${input.brandCategory})
${input.dealValue ? `- Target Deal Value: $${input.dealValue.toLocaleString()}` : ""}

Include: Opening hook, athlete value proposition, brand alignment, deliverables, and a strong close. Keep it under 300 words.`,
          },
        ],
      });
      return { pitch: response.choices[0].message.content };
    }),

  analyzeDeal: protectedProcedure
    .input(z.object({
      brandName: z.string(),
      dealValue: z.number(),
      deliverables: z.string(),
      athleteFollowers: z.number().optional(),
      sport: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are an expert NIL deal analyst. Evaluate deals objectively and provide actionable insights. Be direct and specific.",
          },
          {
            role: "user",
            content: `Analyze this NIL deal:
- Brand: ${input.brandName}
- Offer: $${input.dealValue.toLocaleString()}
- Deliverables: ${input.deliverables}
- Athlete Followers: ${input.athleteFollowers?.toLocaleString() ?? "Unknown"}
- Sport: ${input.sport ?? "College Sport"}

Provide: Deal rating (1-10), fair market value assessment, red flags if any, negotiation tips, and final recommendation. Be direct.`,
          },
        ],
      });
      return { analysis: response.choices[0].message.content };
    }),

  // AI RECRUITER — Profile optimization & coach outreach
  optimizeProfile: protectedProcedure
    .input(z.object({
      sport: z.string(),
      position: z.string().optional(),
      school: z.string().optional(),
      gpa: z.number().optional(),
      height: z.string().optional(),
      weight: z.string().optional(),
      bio: z.string().optional(),
      achievements: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a top college recruiting consultant who has helped hundreds of athletes get scholarships. 
You know exactly what coaches look for and how to make profiles stand out. Be specific and actionable.`,
          },
          {
            role: "user",
            content: `Optimize this athlete's recruiting profile:
- Sport: ${input.sport}
- Position: ${input.position ?? "Not specified"}
- Current School: ${input.school ?? "Not specified"}
- GPA: ${input.gpa ?? "Not specified"}
- Height/Weight: ${input.height ?? "?"} / ${input.weight ?? "?"}
- Current Bio: ${input.bio ?? "None provided"}
- Achievements: ${input.achievements ?? "None listed"}

Provide: 1) Rewritten bio (under 150 words), 2) Top 3 profile improvements, 3) Key stats to highlight, 4) Recruiting strategy tip. Format clearly.`,
          },
        ],
      });
      return { optimized: response.choices[0].message.content };
    }),

  generateCoachEmail: protectedProcedure
    .input(z.object({
      athleteName: z.string(),
      sport: z.string(),
      position: z.string().optional(),
      school: z.string().optional(),
      targetSchool: z.string(),
      coachName: z.string().optional(),
      gpa: z.number().optional(),
      achievements: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are a recruiting expert who writes compelling, professional outreach emails to college coaches. Emails should be personal, specific, and action-oriented. Keep them under 200 words.",
          },
          {
            role: "user",
            content: `Write a coach outreach email for:
- Athlete: ${input.athleteName}
- Sport: ${input.sport}, Position: ${input.position ?? "Not specified"}
- Current School: ${input.school ?? "High School/Transfer"}
- Target School: ${input.targetSchool}
- Coach: ${input.coachName ?? "Head Coach"}
- GPA: ${input.gpa ?? "Strong"}
- Key Achievements: ${input.achievements ?? "Competitive athlete"}

Write a professional, genuine email that will get a response. Include subject line.`,
          },
        ],
      });
      return { email: response.choices[0].message.content };
    }),

  // AI CONTENT — Social media content generation
  generateCaption: protectedProcedure
    .input(z.object({
      platform: z.enum(["instagram", "twitter", "tiktok", "linkedin"]),
      contentType: z.enum(["highlight", "training", "gameday", "nil_deal", "motivation", "recruiting"]),
      context: z.string(),
      athleteName: z.string().optional(),
      sport: z.string().optional(),
      includeHashtags: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const platformGuides: Record<string, string> = {
        instagram: "engaging, 150-200 chars, story-driven, with emojis",
        twitter: "punchy, under 280 chars, conversational, trending",
        tiktok: "energetic, hook-first, youth-focused, viral potential",
        linkedin: "professional, achievement-focused, career-oriented",
      };
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a social media expert for college athletes. You create viral, authentic content that builds personal brands and attracts NIL deals. You understand each platform's unique voice.`,
          },
          {
            role: "user",
            content: `Generate a ${input.platform} caption for a ${input.contentType} post.
Platform style: ${platformGuides[input.platform]}
Context: ${input.context}
${input.athleteName ? `Athlete: ${input.athleteName}` : ""}
${input.sport ? `Sport: ${input.sport}` : ""}
${input.includeHashtags ? "Include 5-8 relevant hashtags." : "No hashtags."}

Write 3 caption options, numbered. Make them authentic and platform-native.`,
          },
        ],
      });
      return { captions: response.choices[0].message.content };
    }),

  generateBio: protectedProcedure
    .input(z.object({
      platform: z.enum(["instagram", "twitter", "tiktok", "linkedin"]),
      athleteName: z.string(),
      sport: z.string(),
      school: z.string().optional(),
      position: z.string().optional(),
      achievements: z.string().optional(),
      personality: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You write compelling athlete social media bios that attract followers, coaches, and brand deals. Keep them punchy and memorable.",
          },
          {
            role: "user",
            content: `Write a ${input.platform} bio for:
- Name: ${input.athleteName}
- Sport: ${input.sport} | Position: ${input.position ?? ""}
- School: ${input.school ?? "College Athlete"}
- Achievements: ${input.achievements ?? "Competitive athlete"}
- Personality: ${input.personality ?? "Driven, focused, team player"}

Write 2 bio options. Keep each under 150 characters for Instagram/Twitter, or 3 sentences for LinkedIn.`,
          },
        ],
      });
      return { bios: response.choices[0].message.content };
    }),

  generateContentPlan: protectedProcedure
    .input(z.object({
      sport: z.string(),
      season: z.enum(["preseason", "in-season", "offseason", "postseason"]),
      goals: z.string(),
      platforms: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are a digital marketing strategist specializing in athlete personal branding. You create actionable 30-day content plans that grow audiences and attract NIL deals.",
          },
          {
            role: "user",
            content: `Create a 30-day content plan for a ${input.sport} athlete:
- Season: ${input.season}
- Goals: ${input.goals}
- Platforms: ${input.platforms.join(", ")}

Provide: Weekly themes, 3 content ideas per week, best posting times, and one viral content idea. Format as a clear schedule.`,
          },
        ],
      });
      return { plan: response.choices[0].message.content };
    }),

  // AI ROBOT COMPANION — Conversational robot assistant for athletes
  robotChat: protectedProcedure
    .input(z.object({
      message: z.string(),
      scenario: z.string().optional(),
      sport: z.string().optional(),
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })).optional(),
    }))
    .mutation(async ({ input }) => {
      const systemPrompt = `You are LYNX — the ATHLYNX AI Robot Companion. You are a friendly, knowledgeable, and motivating AI assistant built specifically for athletes.

You help athletes with:
- Training tips, drills, and workout plans for any sport
- Recruiting advice and college selection
- NIL deals, brand partnerships, and contract guidance
- Game strategy, film review, and play analysis
- Recovery, nutrition, and wellness
- Mental performance and pre-game preparation
- Social media growth and personal branding
- Academic balance and time management
- Transfer portal decisions
- Anything an athlete needs in the stands, on the field, in the locker room, or at home

Current scenario: ${input.scenario ?? "General athlete assistance"}
Athlete's sport: ${input.sport ?? "Not specified"}

Be encouraging, specific, and practical. Use sports terminology naturally. Keep responses focused and actionable. You are their robot teammate who never sleeps.`;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...(input.history ?? []).map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
        { role: "user" as const, content: input.message },
      ];

      const response = await invokeLLM({ messages });
      return { reply: response.choices[0].message.content };
    }),

  // AI PLAYBOOK — The Athlete Playbook recruiting intelligence
  getRecruitingAdvice: protectedProcedure
    .input(z.object({
      sport: z.string(),
      position: z.string().optional(),
      currentSchool: z.string().optional(),
      targetLevel: z.enum(["D1", "D2", "D3", "NAIA", "JUCO", "Transfer"]),
      gpa: z.number().optional(),
      question: z.string(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are "The Athlete Playbook" — ATHLYNX's AI recruiting intelligence engine. 
You have deep knowledge of college recruiting timelines, NCAA rules, NIL regulations, and what coaches want.
You help athletes from all backgrounds — especially those from smaller schools — maximize their recruiting potential.
Be specific, encouraging, and actionable. Reference real recruiting timelines and NCAA rules where relevant.`,
          },
          {
            role: "user",
            content: `Athlete Profile:
- Sport: ${input.sport}
- Position: ${input.position ?? "Not specified"}
- Current School: ${input.currentSchool ?? "Not specified"}
- Target Level: ${input.targetLevel}
- GPA: ${input.gpa ?? "Not specified"}

Question: ${input.question}

Provide a detailed, actionable answer. Include specific next steps, timelines, and resources.`,
          },
        ],
      });
      return { advice: response.choices[0].message.content };
    }),
});
