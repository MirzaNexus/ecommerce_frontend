export type AddressType = "shipping" | "billing";

export interface Address {
  id: string;
  type: AddressType;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}
