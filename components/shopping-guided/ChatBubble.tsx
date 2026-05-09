import React from "react";
import {
  MessageRole,
  ChatActionType,
  RecommendationResponse,
} from "@/types/guided-shopping";
import { ProductRecommendationCard } from "./ProductRecommendationCard";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface Props {
  role: MessageRole;
  content: string;
  actionType?: ChatActionType;
  metadata?: any;
  onAddToCart: (id: string, metadata?: any) => void;
  onViewDetails: (id: string) => void;
}

export const ChatBubble = ({
  role,
  content,
  actionType,
  metadata,
  onAddToCart,
  onViewDetails,
}: Props) => {
  const isBot = role === MessageRole.BOT;

  let recommendations: RecommendationResponse | null = null;
  if (isBot && actionType === ChatActionType.RECOMMENDATION && metadata) {
    try {
      recommendations =
        typeof metadata === "string" ? JSON.parse(metadata) : metadata;
    } catch (e) {
      /* silent fail */
    }
  }

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isBot ? "justify-start" : "justify-end",
      )}
    >
      <div
        className={cn("flex max-w-[90%] gap-3", !isBot && "flex-row-reverse")}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
            isBot ? "bg-zinc-900 text-white" : "bg-primary text-white",
          )}
        >
          {isBot ? <Bot size={14} /> : <User size={14} />}
        </div>

        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
              isBot
                ? "bg-white text-zinc-800 rounded-tl-none border border-zinc-100"
                : "bg-primary text-white rounded-tr-none",
            )}
          >
            {content}
          </div>

          {recommendations?.products && (
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth -mx-2 px-2 snap-x">
              {recommendations.products.map((product) => (
                <ProductRecommendationCard
                  key={product.productId}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
