import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationState {
  hasNewNotification: boolean;
  setHasNewNotification: (value: boolean) => void;
  markAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      hasNewNotification: false,
      setHasNewNotification: (value) => set({ hasNewNotification: value }),
      markAsRead: () => set({ hasNewNotification: false }),
    }),
    {
      name: "notification-storage", // localStorage key
    },
  ),
);
