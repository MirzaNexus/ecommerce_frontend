import { useFetch } from "../useFetch";
import { useMutationHook } from "../useMutationHook";
import { orderService } from "@/services/orderService";
import { paymentService } from "@/services/paymentService";
import { Order, OrderStatus, UserOrdersResponse } from "@/types/order.types";
import { CheckoutFormValues } from "@/validators/order/order.schema";
import { toast } from "sonner";

export const useOrder = () => {
  const checkoutMutation = useMutationHook<Order, CheckoutFormValues>(
    orderService.checkout,
    {
      onSuccess: async (order) => {
        try {
          const { url } = await paymentService.createSession(order.id);
          if (url) {
            window.location.href = url; // Redirect to Stripe
          }
        } catch (error) {
          toast.error(
            "Order created, but failed to initiate payment. Please try again from Order History.",
          );
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Checkout failed");
      },
    },
  );

  const cancelOrderMutation = useMutationHook<void, string>(
    orderService.cancelOrder,
    {
      onSuccess: () => {
        toast.success("Order cancelled successfully");
      },
    },
  );

  const useGetOrderDetails = (id: string) => {
    return useFetch<Order>(
      ["order", id],
      () => orderService.getOrderDetails(id),
      {
        enabled: !!id,
        retry: false, // Error par dobara hit NA kare
        refetchOnWindowFocus: false,
      },
    );
  };

  const useGetUserOrders = (page: number = 1, limit: number = 10) => {
    return useFetch<UserOrdersResponse>(
      ["user-orders", page, limit], // Cache key mein page/limit lazmi rakhein
      () => orderService.getUserOrders(page, limit),
      {
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: (previousData) => previousData, // Pagination smooth karne ke liye
      },
    );
  };

  return {
    checkout: checkoutMutation.mutate,
    isSubmitting: checkoutMutation.isPending,
    cancelOrder: cancelOrderMutation.mutate,
    useGetOrderDetails,
    useGetUserOrders,
  };
};
