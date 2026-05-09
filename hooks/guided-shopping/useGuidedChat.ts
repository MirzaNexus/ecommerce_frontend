"use client";
import { useState, useEffect, useCallback } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useMutationHook } from "@/hooks/useMutationHook";
import GuidedShoppingService from "@/services/guided-shopping.service";
import { chatSocket } from "@/services/guided-shopping.socket";
import { useAuthStore } from "@/store/authStore";
import {
  FinalChatResponse,
  CreateChatMessageRequest,
  MessageRole,
  ChatHistoryMessage,
} from "@/types/guided-shopping";

export const useGuidedChat = (sessionId: string | null) => {
  const token = useAuthStore((s) => s.accessToken);
  const [messages, setMessages] = useState<Partial<ChatHistoryMessage>[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // 1. Fetch History using your useFetch wrapper
  const { data: history, isLoading: isLoadingHistory } = useFetch<
    ChatHistoryMessage[]
  >(
    ["chat-history", sessionId],
    () => GuidedShoppingService.getHistory(sessionId!),
    { enabled: !!sessionId },
  );

  // Sync history to local state when loaded
  useEffect(() => {
    if (history) setMessages(history);
  }, [history]);

  // 2. Fallback REST Mutation using your useMutationHook
  const chatMutation = useMutationHook<
    FinalChatResponse,
    CreateChatMessageRequest
  >((data) => GuidedShoppingService.handleChat(data));

  // 3. Socket Setup
  useEffect(() => {
    if (sessionId && token) {
      chatSocket.connect(token);

      chatSocket.onBotStatus(({ typing }) => setIsTyping(typing));

      chatSocket.onNewMessage((response) => {
        setMessages((prev) => [
          ...prev,
          {
            role: MessageRole.BOT,
            content: response.message,
            createdAt: new Date().toISOString(),
            metadata: response.recommendations
              ? JSON.stringify(response.recommendations)
              : null,
            // We append the whole response to metadata for the renderer to use later
          },
        ]);
      });

      return () => chatSocket.disconnect();
    }
  }, [sessionId, token]);

  // 4. Send Message Logic (Hybrid: Socket with REST Fallback)
  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId) return;

      const userMessage: Partial<ChatHistoryMessage> = {
        role: MessageRole.USER,
        content,
        createdAt: new Date().toISOString(),
      };

      // Optimistic Update
      setMessages((prev) => [...prev, userMessage]);

      const payload: CreateChatMessageRequest = {
        sessionId,
        role: MessageRole.USER,
        content,
      };

      // Attempt Socket Send
      chatSocket.sendMessage(payload);
    },
    [sessionId],
  );

  return {
    messages,
    sendMessage,
    isTyping,
    isLoadingHistory,
    isSending: chatMutation.isPending,
  };
};
