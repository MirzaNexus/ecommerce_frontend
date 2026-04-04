export type UserStatus = "active" | "suspended";
export type UserRole = "buyer" | "admin";

export interface AddressResponseDTO {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  type: string;
  isDefault: boolean;
}

export interface AdminUserListDTO {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
}

export interface AdminUserDTO extends AdminUserListDTO {
  phone?: string;
  addresses: AddressResponseDTO[];
}

export interface PaginatedUsersDTO {
  data: AdminUserListDTO[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
