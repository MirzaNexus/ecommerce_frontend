import React, { memo } from "react";
import { ChatBubble } from "./ChatBubble";
import { SuggestionPills } from "./SuggestionPills";
import { TypingIndicator } from "./TypingIndicator";
import { ChatHistoryMessage, ChatActionType } from "@/types/guided-shopping";

interface Props {
  messages: Partial<ChatHistoryMessage>[];
  isTyping: boolean;
  onSuggestionClick: (prompt: string) => void;
  onAddToCart: (productId: string, metadata?: any) => void;
  onViewDetails: (name: string) => void;
}

export const MessageRenderer = memo(
  ({
    messages,
    isTyping,
    onSuggestionClick,
    onAddToCart,
    onViewDetails,
  }: Props) => {
    return (
      <div className="flex flex-col w-full space-y-2">
        {messages.map((msg, idx) => {
          let actionType: ChatActionType | undefined;
          let suggestions: string[] = [];

          // if (msg.metadata) {
          //   try {
          //     const meta =
          //       typeof msg.metadata === "string"
          //         ? JSON.parse(msg.metadata)
          //         : msg.metadata;
          //     actionType = meta.actionType;
          //     suggestions = meta.suggestionPrompts || [];
          //   } catch (e) {
          //     console.error("Metadata parse error");
          //   }
          // }

          if (msg.metadata) {
            try {
              const meta =
                typeof msg.metadata === "string"
                  ? JSON.parse(msg.metadata)
                  : msg.metadata;

              // FIX: Agar metadata mein products hain, to khud se actionType set kar dein
              if (meta.products && meta.products.length > 0) {
                actionType = ChatActionType.RECOMMENDATION;
              } else {
                actionType = meta.actionType;
              }

              suggestions = meta.suggestionPrompts || [];
            } catch (e) {
              console.error("Metadata parse error");
            }
          }

          return (
            <React.Fragment key={msg.id || idx}>
              <ChatBubble
                role={msg.role!}
                content={msg.content!}
                actionType={actionType}
                metadata={msg.metadata}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />

              {/* Show suggestions only for the latest bot message */}
              {idx === messages.length - 1 && suggestions.length > 0 && (
                <div className="ml-10 pt-2">
                  <SuggestionPills
                    prompts={suggestions}
                    onSelect={onSuggestionClick}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {isTyping && (
          <div className="ml-10">
            <TypingIndicator />
          </div>
        )}
      </div>
    );
  },
);

MessageRenderer.displayName = "MessageRenderer";
