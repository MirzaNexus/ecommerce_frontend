"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGuidedShoppingSession } from "@/hooks/guided-shopping/useGuidedShoppingSession";
import { useGuidedChat } from "@/hooks/guided-shopping/useGuidedChat";
import { MessageRenderer } from "./MessageRenderer";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { deepSanitize } from "@/utils/sanitizer";

export const GuidedChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { startSession } = useGuidedShoppingSession();
  const { addItem } = useCartStore();
  const { messages, sendMessage, isTyping, isLoadingHistory } =
    useGuidedChat(sessionId);

  // 1. Initialize session only when modal opens for the first time
  useEffect(() => {
    if (isOpen && !sessionId) {
      startSession({}).then((res) => setSessionId(res.id));
    }
  }, [isOpen, sessionId, startSession]);

  // 2. Auto-scroll to bottom whenever messages update or bot is typing
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    const cleanInput = deepSanitize(input.trim());
    if (!cleanInput || isTyping) return;
    sendMessage(cleanInput);
    setInput("");
  };

  const handleAddToCart = (productId: string, metadata?: any) => {
    // Aligned with your useCartStore CartItem interface
    const newItem: CartItem = {
      productId: productId,
      variantId: metadata?.variantId || undefined,
      name: metadata?.name || "AI Recommended Product",
      price: metadata?.price || 0,
      image:
        metadata?.imageUrl || metadata?.image || "/placeholder-product.png",
      attributes: metadata?.attributes || {},
      quantity: 1,
      stock: metadata?.stock || 10,
    };

    addItem(newItem);
  };

  //   return (
  //     <>
  //       {/* Floating Trigger Button */}
  //       <Button
  //         onClick={() => setIsOpen(true)}
  //         className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 bg-primary text-white"
  //       >
  //         <Sparkles className="w-6 h-6 animate-pulse" />
  //       </Button>

  //       {/* Main Chat Interface */}
  //       <Dialog open={isOpen} onOpenChange={setIsOpen}>
  //         <DialogContent className="sm:max-w-[450px] h-[650px] flex flex-col p-0 overflow-hidden gap-0 border-none shadow-2xl">
  //           <DialogHeader className="p-4 border-b bg-zinc-900 text-white shrink-0">
  //             <DialogTitle className="flex items-center gap-2 text-lg font-medium">
  //               <Sparkles className="w-5 h-5 text-yellow-400" />
  //               AI Shopping Assistant
  //             </DialogTitle>
  //           </DialogHeader>

  //           {/* Messages Area */}
  //           <div
  //             ref={scrollAreaRef}
  //             className="flex-1 overflow-y-auto p-4 bg-zinc-50/50 scroll-smooth"
  //           >
  //             {isLoadingHistory ? (
  //               <div className="flex flex-col items-center justify-center h-full space-y-2 text-zinc-400">
  //                 <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  //                 <p className="text-xs">Syncing your session...</p>
  //               </div>
  //             ) : messages.length === 0 ? (
  //               <div className="flex flex-col items-center justify-center h-full text-zinc-400 opacity-60">
  //                 <ShoppingBag className="w-12 h-12 mb-4" />
  //                 <p className="text-sm font-medium">
  //                   How can I help you shop today?
  //                 </p>
  //               </div>
  //             ) : (
  //               <MessageRenderer
  //                 messages={messages}
  //                 isTyping={isTyping}
  //                 onSuggestionClick={(prompt) => sendMessage(prompt)}
  //                 onAddToCart={handleAddToCart}
  //                 onViewDetails={(productId) => {
  //                   sendMessage(
  //                     `I'd like to see more details about: ${productId}`,
  //                   );
  //                 }}
  //               />
  //             )}
  //           </div>

  //           {/* Input Footer */}
  //           <div className="p-4 border-t bg-white flex gap-2 shrink-0">
  //             <Input
  //               placeholder="Describe what you're looking for..."
  //               value={input}
  //               onChange={(e) => setInput(e.target.value)}
  //               onKeyDown={(e) => e.key === "Enter" && handleSend()}
  //               className="bg-zinc-100 border-none focus-visible:ring-1 focus-visible:ring-primary"
  //               disabled={isTyping}
  //             />
  //             <Button
  //               onClick={handleSend}
  //               size="icon"
  //               disabled={!input.trim() || isTyping}
  //               className="shrink-0"
  //             >
  //               <Send className="w-4 h-4" />
  //             </Button>
  //           </div>
  //         </DialogContent>
  //       </Dialog>
  //     </>
  //   );

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 bg-primary text-white"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </Button>

      {/* Main Chat Interface */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* FIX 1: Added overflow-hidden to prevent container leakage */}
        <DialogContent className="sm:max-w-[450px] h-[90vh] max-h-[650px] flex flex-col p-0 overflow-hidden border-none shadow-2xl bg-white">
          {/* Header: Fixed height, won't shrink */}
          <DialogHeader className="p-4 border-b bg-zinc-900 text-white shrink-0">
            <DialogTitle className="flex items-center gap-2 text-lg font-medium">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              AI Shopping Assistant
            </DialogTitle>
            <DialogDescription className="sr-only">
              Dialog description for screen readers.
            </DialogDescription>
          </DialogHeader>

          {/* Messages Area: FIX 2 - Proper Flex containment */}
          <div className="flex-grow relative min-h-0 overflow-hidden bg-zinc-50/50">
            <div
              ref={scrollAreaRef}
              className="absolute inset-0 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
            >
              {isLoadingHistory ? (
                <div className="flex flex-col items-center justify-center h-full space-y-2 text-zinc-400">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-medium">Loading session...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400 opacity-60 px-8 text-center">
                  <ShoppingBag className="w-12 h-12 mb-4" />
                  <p className="text-sm">
                    Assalam-o-Alaikum! Main aapka AI assistant hoon. Main aaj
                    aapki kya madad kar sakta hoon?
                  </p>
                </div>
              ) : (
                <MessageRenderer
                  messages={messages}
                  isTyping={isTyping}
                  onSuggestionClick={(prompt) => sendMessage(prompt)}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(name) => {
                    sendMessage(`I'd like to see more details about: ${name}`);
                  }}
                />
              )}
              {/* Invisible anchor for scrolling */}
              <div className="pb-2" />
            </div>
          </div>

          {/* Input Footer: FIX 3 - Added distinct bg and padding to prevent 'clipping' */}
          <div className="p-4 border-t bg-white shrink-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="bg-zinc-100 border-none focus-visible:ring-1 focus-visible:ring-primary h-11"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!input.trim() || isTyping}
                className="shrink-0 h-11 w-11 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
