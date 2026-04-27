export interface SubscribeNewsletterDto {
  email: string;
  fcmToken?: string;
  userId?: string;
}

export interface SubscriptionStatus {
  isSubscribed: boolean;
  email?: string;
}

export interface NewsletterResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface BroadcastNewsDto {
  title: string;
  body: string;
  imageUrl?: string;
}
