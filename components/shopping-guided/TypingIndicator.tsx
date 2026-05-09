export const TypingIndicator = () => (
  <div className="flex gap-1 p-4 bg-zinc-100 w-16 rounded-2xl rounded-tl-none mb-6 animate-pulse">
    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
  </div>
);
