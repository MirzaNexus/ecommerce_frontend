import { useFetch } from "../useFetch";
import { useMutationHook } from "../useMutationHook";
import { orderService } from "@/services/orderService";
import {
  Order,
  OrderQuery,
  OrderStatus,
  PaginatedOrders,
} from "@/types/order.types";
import { useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { toast } from "sonner";

export const useAdminOrder = () => {
  const queryClient = useQueryClient();

  /**
   * QUERY: Fetch Paginated Orders for Admin
   */
  const useGetAdminOrders = (query: OrderQuery) => {
    return useFetch<PaginatedOrders>(
      ["admin-orders", query],
      () => orderService.getAdminOrders(query),
      {
        placeholderData: (previousData) => previousData, // Smooth pagination
      },
    );
  };

  const useGetAdminOrderDetails = (id: string) => {
    return useFetch<Order>(
      ["admin-order", id],
      () => orderService.getOrderDetails(id), // Ensure this exists in orderService
      {
        enabled: !!id,
        retry: false, // Error par dobara hit NA kare
        refetchOnWindowFocus: false,
      },
    );
  };

  /**
   * MUTATION: Update Status (Processing, Shipped, etc.)
   */
  const updateStatusMutation = useMutationHook<
    void,
    { id: string; status: OrderStatus }
  >(({ id, status }) => orderService.updateStatus(id, status), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update status");
    },
  });

  return {
    useGetAdminOrderDetails,
    useGetAdminOrders,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};
