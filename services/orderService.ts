import api from "./apiClient";
import {
  Order,
  OrderQuery,
  OrderStatus,
  PaginatedOrders,
  UserOrdersResponse,
} from "@/types/order.types";

import { CheckoutFormValues } from "@/validators/order/order.schema";
import { deepSanitize } from "@/utils/sanitizer";

export const orderService = {
  checkout: async (data: CheckoutFormValues): Promise<Order> => {
    const sanitizedData = deepSanitize(data);
    const response = await api.post<Order>("/orders/checkout", sanitizedData);
    return response.data;
  },

  /**
   * BUYER/ADMIN: Get details of a specific order
   */
  getOrderDetails: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  /**
   * BUYER/ADMIN: Cancel an order
   */
  cancelOrder: async (id: string): Promise<void> => {
    await api.post(`/orders/${id}/cancel`);
  },

  getUserOrders: async (page = 1, limit = 10): Promise<UserOrdersResponse> => {
    const response = await api.get<UserOrdersResponse>("/orders/my-orders", {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * ADMIN: Fetch all orders with pagination and status filters
   */
  getAdminOrders: async (query: OrderQuery): Promise<PaginatedOrders> => {
    const response = await api.get<PaginatedOrders>("/orders", {
      params: query,
    });
    return response.data;
  },

  /**
   * ADMIN: Update order status
   */
  updateStatus: async (id: string, status: OrderStatus): Promise<void> => {
    await api.patch(`/orders/${id}/status`, { status });
  },

  /**
   * ADMIN: Search payment details by Transaction ID
   */
  getPaymentByTxId: async (txId: string): Promise<any> => {
    const response = await api.get(`/orders/payments/${txId}`);
    return response.data;
  },
};
