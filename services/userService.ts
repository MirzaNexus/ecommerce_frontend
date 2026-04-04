import apiClient from "./apiClient";
import { UserProfile } from "@/types/user";
import { RegisterBuyer } from "@/types/user";

export const userService = {
  registerBuyer: async (payload: RegisterBuyer) => {
    const { data } = await apiClient.post("/users/register", payload);
    return data;
  },

  async getProfile(): Promise<UserProfile> {
    const { data } = await apiClient.get("/users/me");
    return data;
  },

  async updateProfile(payload: Partial<UserProfile>): Promise<UserProfile> {
    const { data } = await apiClient.patch("/users/me", payload);
    return data;
  },
};
