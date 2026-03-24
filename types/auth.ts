export type User = {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "admin";
};

export type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};
