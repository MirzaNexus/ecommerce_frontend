import { z } from "zod";
import { RecommendationEventType } from "@/types/recomendation.types";
import { AlgoliaPayload } from "@/types/recomendation.types";

export const AlgoliaPayloadSchema = z.object({
  eventName: z.string(),
  userToken: z.string(),
  index: z.string(),
  objectIDs: z.array(z.string()),
  timestamp: z.number(),
  queryID: z.string().optional(),
});

export const CreateRecommendationEventSchema = z.object({
  user_id: z.string().uuid({ message: "Invalid User ID format" }),
  product_id: z.string().uuid({ message: "Invalid Product ID format" }),
  category_id: z.string().uuid({ message: "Invalid Category ID format" }),
  event_type: z.nativeEnum(RecommendationEventType),
  price_at_event: z.number().min(0, { message: "Price cannot be negative" }),
  session_id: z.string().optional(),
  idempotency_key: z.string().uuid({ message: "Invalid Idempotency Key" }),
  quantity: z.number().min(1).default(1).optional(),
  algolia_payload: AlgoliaPayloadSchema.partial().optional(),
});

// Infer the TypeScript type from the Zod schema
export type CreateRecommendationEventInput = z.infer<
  typeof CreateRecommendationEventSchema
>;
