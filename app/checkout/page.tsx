"use client";

import { useCartStore } from "@/store/useCartStore"; // Your existing store
import { useTrackRecommendation } from "@/hooks/recomndation/useRecommendation";
import { RecommendationEventType } from "@/types/recomendation.types";
import { useAuthStore } from "@/store/authStore";
import { v4 as uuidv4 } from "uuid";

import {
  CheckoutFormValues,
  checkoutSchema,
} from "@/validators/order/order.schema";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSelection } from "@/components/order/AddressSelection";
import { useOrder } from "@/hooks/order/useOrder";

export default function CheckoutPage() {
  const { items: cartItems, getTotalPrice } = useCartStore(); // Using your store
  const totalPrice = getTotalPrice(); // Get total price from the store
  const { checkout, isSubmitting } = useOrder();
  const { mutate: trackEvent } = useTrackRecommendation();
  const userId = useAuthStore((s) => s.user?.id);

  // Mapping your Store items to the Backend DTO structure
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      userAddressId: null, // Default null, user selection se update hoga
      items: cartItems.map((item) => ({
        productVariantId: item.variantId || item.productId,
        quantity: item.quantity,
      })),
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    if (userId && cartItems.length > 0) {
      cartItems.forEach((item) => {
        trackEvent({
          user_id: userId,
          product_id: item.productId,
          category_id: item?.categoryId || "",
          event_type: RecommendationEventType.PAID_ORDER,
          price_at_event: item.price,
          quantity: item.quantity,
          idempotency_key: uuidv4(),
          algolia_payload: {
            eventName: "Order Completed",
            index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "",
            userToken: userId,
            objectIDs: [item.productId],
            timestamp: Date.now(),
          },
        });
      });
    }
    checkout(data);
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Please add items before checking out.</p>;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="container mx-auto py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Address Selection (The Logic we built in Phase 4) */}
          <div className="lg:col-span-2 space-y-8">
            <AddressSelection savedAddresses={[]} />
          </div>

          {/* Right: Final Review & Summary */}
          <div className="bg-card p-6 rounded-xl border h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4">Final Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Grand Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isSubmitting
                ? "Generating Stripe Session..."
                : "Confirm & Pay Now"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
