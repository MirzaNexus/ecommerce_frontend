import { io, Socket } from "socket.io-client";
import {
  CreateChatMessageRequest,
  FinalChatResponse,
} from "@/types/guided-shopping";
class GuidedShoppingSocket {
  private socket: Socket | null = null;
  private readonly baseUrl =
    process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

  connect(token: string) {
    if (this.socket?.connected) return;

    const connectionUrl = `${this.baseUrl}/guided-shopping`;

    this.socket = io(connectionUrl, {
      withCredentials: true,
      transports: ["polling", "websocket"],
      auth: { token: `Bearer ${token}` },
    });

    this.socket.on("connect", () => console.log("✅ Chat Socket Connected"));
    this.socket.on("disconnect", () =>
      console.log("❌ Chat Socket Disconnected"),
    );
  }

  /**
   * Sends a message through the 'send_message' subscription
   */
  sendMessage(data: CreateChatMessageRequest) {
    this.socket?.emit("send_message", data);
  }

  /**
   * Listen for real-time bot responses
   */
  onNewMessage(callback: (response: FinalChatResponse) => void) {
    this.socket?.on("new_message", callback);
  }

  /**
   * Listen for bot typing/thinking status
   */
  onBotStatus(callback: (status: { typing: boolean }) => void) {
    this.socket?.on("bot_status", callback);
  }

  /**
   * Cleanup listeners and disconnect
   */
  disconnect() {
    if (this.socket) {
      this.socket.off("new_message");
      this.socket.off("bot_status");
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const chatSocket = new GuidedShoppingSocket();
