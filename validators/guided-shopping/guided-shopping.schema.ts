import { z } from "zod";
import {
  SessionStatus,
  DeviceType,
  MessageRole,
  ChatActionType,
} from "@/types/guided-shopping";

export const sessionMetadataSchema = z.object({
  deviceType: z.nativeEnum(DeviceType).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  isBot: z.boolean().optional(),
  originUrl: z.string().url().optional(),
  customFlags: z.record(z.string(), z.any()).optional(),
});

export const createChatSessionSchema = z.object({
  buyerId: z.string().uuid("Buyer ID must be a valid UUID").optional(),
  status: z.nativeEnum(SessionStatus).optional().default(SessionStatus.ACTIVE),
  contextVersion: z.number().int().min(1).optional(),
  expiresAt: z
    .string()
    .datetime({ message: "Must be a valid ISO date" })
    .optional(),
  metadata: sessionMetadataSchema.optional(),
});

export const tokenUsageSchema = z.object({
  promptTokens: z.number().min(0),
  completionTokens: z.number().min(0),
  totalTokens: z.number().min(0),
});

export const createChatMessageSchema = z.object({
  sessionId: z.string().uuid("Session ID must be a valid UUID"),
  role: z.nativeEnum(MessageRole),
  content: z.string().min(1, "Message content cannot be empty"),
  correlationId: z.string().uuid().optional(),
  tokenUsage: tokenUsageSchema.optional(),
});

// chat response

export const recommendedProductSchema = z.object({
  productId: z.string().uuid(),
  rankingScore: z.number().min(0).max(100),
  reasoning: z.string().min(1),
});

export const recommendationResponseSchema = z.object({
  sessionId: z.string().uuid(),
  products: z.array(recommendedProductSchema),
  totalMatches: z.number(),
});

export const finalChatResponseSchema = z.object({
  message: z.string(),
  actionType: z.nativeEnum(ChatActionType),
  recommendations: recommendationResponseSchema.optional(),
  suggestionPrompts: z.array(z.string()).optional(),
});

// Infer types from Zod for form usage
export type CreateChatSessionInput = z.infer<typeof createChatSessionSchema>;
export type CreateChatMessageInput = z.infer<typeof createChatMessageSchema>;
