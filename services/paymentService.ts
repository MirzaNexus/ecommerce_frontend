import api from "./apiClient";
export const paymentService = {
  /**
   * Create a Stripe Checkout Session for an existing order
   */
  createSession: async (orderId: string): Promise<{ url: string }> => {
    const response = await api.post<{ url: string }>("/payment/session", {
      orderId,
    });
    return response.data;
  },
};
