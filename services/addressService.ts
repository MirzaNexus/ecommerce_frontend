import apiClient from "./apiClient";
import { Address } from "@/types/address";

export const addressService = {
  getAddresses: async (): Promise<Address[]> => {
    const { data } = await apiClient.get("/users/me/addresses");
    return data;
  },

  createAddress: async (address: Partial<Address>): Promise<Address> => {
    const { data } = await apiClient.post("/users/me/addresses", address);
    return data;
  },

  updateAddress: async (
    id: string,
    address: Partial<Address>,
  ): Promise<Address> => {
    const { data } = await apiClient.patch(
      `/users/me/addresses/${id}`,
      address,
    );
    return data;
  },

  deleteAddress: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/me/addresses/${id}`);
  },

  setDefault: async (id: string): Promise<Address> => {
    const { data } = await apiClient.patch(`/users/me/addresses/${id}/default`);
    return data;
  },
};
