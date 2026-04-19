import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { conversations, conversationParticipants, messages, users } from "../../drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

export const messengerRouter = router({
  getConversations: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const participantRows = await db
      .select({ conversationId: conversationParticipants.conversationId })
      .from(conversationParticipants)
      .where(eq(conversationParticipants.userId, ctx.user.id));

    if (participantRows.length === 0) return [];

    const convIds = participantRows.map((r: { conversationId: number }) => r.conversationId);
    return db
      .select()
      .from(conversations)
      .where(inArray(conversations.id, convIds))
      .orderBy(desc(conversations.lastMessageAt));
  }),

  getMessages: protectedProcedure
    .input(z.object({ conversationId: z.number(), limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const isParticipant = await db
        .select()
        .from(conversationParticipants)
        .where(and(
          eq(conversationParticipants.conversationId, input.conversationId),
          eq(conversationParticipants.userId, ctx.user.id)
        ))
        .limit(1);
      if (isParticipant.length === 0) throw new Error("Not a participant");

      return db
        .select({
          id: messages.id,
          content: messages.content,
          messageType: messages.messageType,
          mediaUrl: messages.mediaUrl,
          isEdited: messages.isEdited,
          isDeleted: messages.isDeleted,
          createdAt: messages.createdAt,
          senderId: messages.senderId,
          senderName: users.name,
          senderAvatar: users.avatarUrl,
        })
        .from(messages)
        .leftJoin(users, eq(messages.senderId, users.id))
        .where(and(
          eq(messages.conversationId, input.conversationId),
          eq(messages.isDeleted, "no")
        ))
        .orderBy(desc(messages.createdAt))
        .limit(input.limit);
    }),

  sendMessage: protectedProcedure
    .input(z.object({ conversationId: z.number(), content: z.string().min(1).max(2000) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.insert(messages).values({
        conversationId: input.conversationId,
        senderId: ctx.user.id,
        content: input.content,
        messageType: "text",
      });
      await db.update(conversations)
        .set({ lastMessagePreview: input.content.slice(0, 255), lastMessageAt: new Date() })
        .where(eq(conversations.id, input.conversationId));
      return { success: true };
    }),

  startConversation: protectedProcedure
    .input(z.object({ recipientId: z.number(), initialMessage: z.string().min(1).max(2000) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const myConvs = await db
        .select({ conversationId: conversationParticipants.conversationId })
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, ctx.user.id));

      const theirConvs = await db
        .select({ conversationId: conversationParticipants.conversationId })
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, input.recipientId));

      const myIds = new Set(myConvs.map((r: { conversationId: number }) => r.conversationId));
      const existing = theirConvs.find((r: { conversationId: number }) => myIds.has(r.conversationId));

      let conversationId: number;
      if (existing) {
        conversationId = existing.conversationId;
      } else {
        const [conv] = await db.insert(conversations).values({
          type: "direct",
          createdBy: ctx.user.id,
          lastMessagePreview: input.initialMessage.slice(0, 255),
          lastMessageAt: new Date(),
        });
        conversationId = (conv as any).insertId;
        await db.insert(conversationParticipants).values([
          { conversationId, userId: ctx.user.id },
          { conversationId, userId: input.recipientId },
        ]);
      }

      await db.insert(messages).values({
        conversationId,
        senderId: ctx.user.id,
        content: input.initialMessage,
        messageType: "text",
      });

      return { success: true, conversationId };
    }),
});
