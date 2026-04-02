import apiClient from "./apiClient";
import { PaginatedUsersDTO, AdminUserDTO, UserStatus } from "@/types/admin";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  status?: UserStatus;
}

export const adminService = {
  getUsers: async (params: GetUsersParams): Promise<PaginatedUsersDTO> => {
    const { data } = await apiClient.get("/admin/users", {
      params: {
        page: params.page,
        limit: params.limit,
        status: params.status,
      },
    });

    return data;
  },

  getUserById: async (id: string): Promise<AdminUserDTO> => {
    const { data } = await apiClient.get(`/admin/users/${id}`);
    return data;
  },

  updateUserStatus: async (
    id: string,
    status: UserStatus,
  ): Promise<AdminUserDTO> => {
    const { data } = await apiClient.patch(`/admin/users/${id}/status`, {
      status,
    });

    return data;
  },
};
