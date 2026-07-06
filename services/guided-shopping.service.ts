import api from "./apiClient";
import {
  CreateChatSessionRequest,
  ChatSessionResponse,
  CreateChatMessageRequest,
  FinalChatResponse,
  ChatHistoryMessage,
} from "@/types/guided-shopping";

const GuidedShoppingService = {
  startSession: async (
    data: CreateChatSessionRequest,
  ): Promise<ChatSessionResponse> => {
    const response = await api.post<ChatSessionResponse>(
      "/guided-shopping/sessions",
      data,
    );
    return response.data;
  },

  handleChat: async (
    data: CreateChatMessageRequest,
  ): Promise<FinalChatResponse> => {
    const response = await api.post<FinalChatResponse>(
      "/guided-shopping/chat",
      data,
    );
    return response.data;
  },

  getHistory: async (sessionId: string): Promise<ChatHistoryMessage[]> => {
    const response = await api.get<ChatHistoryMessage[]>(
      `/guided-shopping/sessions/${sessionId}/history`,
    );
    return response.data;
  },
};

export default GuidedShoppingService;
