export enum OrderStatus {
  CREATED = "CREATED",
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface AddressSnapshot {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productVariantId: string;
  quantity: number;
  price: number;
  productName: string;
  productImage?: string;
  // productVariant?: any; // To be typed based on Product Module
}

export interface Payment {
  id: string;
  orderId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  gatewayResponse?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  addressSnapshot: AddressSnapshot;
  userAddressId: string | null;
  idempotencyKey: string;
  items: OrderItem[];
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
  // Admin only fields
  user?: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
  };
}

export interface OrderQuery {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export interface PaginatedOrders {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// orderService.ts mein add karein

export interface UserOrdersResponse {
  items: {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    itemCount: number;
    firstItemName: string;
  }[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
