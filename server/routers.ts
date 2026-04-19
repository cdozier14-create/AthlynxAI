import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { stripeRouter } from "./stripe/stripeRouter";
import { feedRouter } from "./routers/feedRouter";
import { profileRouter } from "./routers/profileRouter";
import { messengerRouter } from "./routers/messengerRouter";
import { nilRouter } from "./routers/nilRouter";
import { trainingRouter } from "./routers/trainingRouter";
import { aiRouter } from "./routers/aiRouter";
import { notificationsRouter } from "./routers/notificationsRouter";
import { messagingRouter } from "./routers/messagingRouter";
import { crmRouter } from "./routers/crmRouter";
import { waitlistRouter } from "./routers/waitlistRouter";
import { verificationRouter } from "./routers/verificationRouter";
import { customAuthRouter } from "./routers/customAuthRouter";
import { adminRouter } from "./routers/adminRouter";
import { feedbackRouter } from "./routers/feedbackRouter";
import { dataRouter } from "./routers/dataRouter";

export const appRouter = router({
  system: systemRouter,
  stripe: stripeRouter,
  feed: feedRouter,
  profile: profileRouter,
  messenger: messengerRouter,
  nil: nilRouter,
  training: trainingRouter,
  ai: aiRouter,
  notifications: notificationsRouter,
  messaging: messagingRouter,
  crm: crmRouter,
  waitlist: waitlistRouter,
  verification: verificationRouter,
  auth: customAuthRouter,
  admin: adminRouter,
  feedback: feedbackRouter,
  data: dataRouter,
});

export type AppRouter = typeof appRouter;
