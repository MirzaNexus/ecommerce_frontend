import * as z from "zod";
import { OrderStatus } from "@/types/order.types";

export const addressSnapshotSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Invalid phone number format"),
  line1: z.string().min(5, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(2, "Country is required"),
});

export const checkoutSchema = z
  .object({
    userAddressId: z.string().uuid().nullable().optional(),
    addressSnapshot: addressSnapshotSchema.optional(),
    items: z
      .array(
        z.object({
          productVariantId: z.string().uuid(),
          quantity: z.number().min(1),
        }),
      )
      .min(1, "Order must have at least one item"),
    idempotencyKey: z.string().optional(),
  })
  .refine(
    (data) => {
      // Logic: If no saved address ID is selected, addressSnapshot MUST be present
      if (!data.userAddressId && !data.addressSnapshot) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a saved address or provide a shipping address",
      path: ["addressSnapshot"],
    },
  );

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
