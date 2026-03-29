export interface RegisterBuyer {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export type Profile = {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  avatarUrl?: string | null;
};
