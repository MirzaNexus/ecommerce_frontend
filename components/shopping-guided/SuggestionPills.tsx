import React from "react";
import { Button } from "@/components/ui/button";
import { deepSanitize } from "@/utils/sanitizer";

interface Props {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export const SuggestionPills = ({ prompts, onSelect }: Props) => {
  const cleanPrompts = deepSanitize(prompts);
  if (!cleanPrompts?.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-2">
      {cleanPrompts.map((prompt, idx) => (
        <Button
          key={idx}
          variant="secondary"
          size="sm"
          className="rounded-full text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
};
