"use client";

import { useCartStore } from "@/store/useCartStore"; // Your existing store

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
    // This triggers the useOrder hook: Checkout -> Stripe Session -> Redirect
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
