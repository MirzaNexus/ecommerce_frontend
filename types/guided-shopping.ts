export enum SessionStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  ABANDONED = "ABANDONED",
}

export enum DeviceType {
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
}

export enum MessageRole {
  USER = "USER",
  BOT = "BOT",
  SYSTEM = "SYSTEM",
}

export enum ChatActionType {
  CLARIFICATION = "CLARIFICATION",
  RECOMMENDATION = "RECOMMENDATION",
  GENERAL = "GENERAL",
  ERROR = "ERROR",
}

export interface SessionMetadata {
  deviceType?: DeviceType;
  ipAddress?: string;
  userAgent?: string;
  isBot?: boolean;
  originUrl?: string;
  customFlags?: Record<string, any>;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface CreateChatSessionRequest {
  buyerId?: string;
  status?: SessionStatus;
  contextVersion?: number;
  expiresAt?: string; // ISO string for transport
  metadata?: SessionMetadata;
}

export interface ChatSessionResponse {
  id: string;
  status: SessionStatus;
  buyerId?: string;
  expiresAt: string; // Transported as ISO string
  contextVersion: number;
  metadata?: SessionMetadata;
}

export interface CreateChatMessageRequest {
  sessionId: string;
  role: MessageRole;
  content: string;
  correlationId?: string;
  tokenUsage?: TokenUsage;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  correlationId?: string;
  createdAt: string;
  metadata?: any;
}

// chat response

export interface RecommendedProduct {
  productId: string;
  rankingScore: number;
  reasoning: string;
  imageUrl?: string | null;
  price?: number;
  name?: string;
}

export interface RecommendationResponse {
  sessionId: string;
  products: RecommendedProduct[];
  totalMatches: number;
}

export interface FinalChatResponse {
  message: string;
  actionType: ChatActionType;
  recommendations?: RecommendationResponse;
  suggestionPrompts?: string[];
}

// chat history

export interface ChatHistoryUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  avatarUrl?: string;
  fullName: string;
}

export interface ChatHistorySession {
  id: string;
  buyerId: string;
  status: SessionStatus;
  contextVersion: number;
  expiresAt: string;
  createdAt: string;
  metadata: SessionMetadata;
}

export interface ChatHistoryMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  metadata: string | null; // Note: Usually JSON stringified, needs careful parsing
  tokenUsage: TokenUsage;
  correlationId: string;
  createdAt: string;

  session?: ChatHistorySession;
}
