import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutFormValues,
  checkoutSchema,
} from "@/validators/order/order.schema";
import { useOrder } from "@/hooks/order/useOrder";
import { AddressSelection } from "./AddressSelection";

const CheckoutPageContent = ({ cartItems }: { cartItems: any[] }) => {
  const { checkout, isSubmitting } = useOrder();

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      items: cartItems.map((item) => ({
        productVariantId: item.variantId,
        quantity: item.qty,
      })),
      userAddressId: null,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    checkout(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          <AddressSelection savedAddresses={[]} />{" "}
          {/* Pass real addresses here */}
        </div>
        <div className="bg-card p-6 rounded-xl border h-fit sticky top-4">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          {/* Add Price Breakdown Here */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Place Order & Pay"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
