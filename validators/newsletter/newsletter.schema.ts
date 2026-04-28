import * as z from "zod";

export const BroadcastSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),

  body: z
    .string()
    .min(1, "Body is required")
    .max(1000, "Body cannot exceed 1000 characters"),

  // Optional string matching @IsOptional() @IsString()
  imageUrl: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")), // Allows empty string if not provided
});

export const SubscribeSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required to join the squad")
    .email("That doesn't look like a valid email address")
    .trim()
    .toLowerCase(),

  // fcmToken optional hai kyunki browser permission deny bhi kar sakta hai
  fcmToken: z.string().optional().or(z.literal("")),

  // userId optional hai kyunki Guest users ke paas ID nahi hogi
  userId: z.string().optional(),
});

export type SubscribeInput = z.infer<typeof SubscribeSchema>;
export type BroadcastInput = z.infer<typeof BroadcastSchema>;
