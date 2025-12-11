"use client";
import { Thread } from "@tada/ui/components/assistant-ui/thread";

export function ConversationCard() {
  return (
    <div className="flex h-full min-h-0 flex-col border-r border-gray-200 bg-white dark:bg-gray-900">
      <div className="flex-shrink-0 flex justify-center">
        {/* Tips éventuels */}
      </div>

      {/* le Thread prend tout le reste */}
      <div className="flex-1 min-h-0">
        <Thread />
      </div>
    </div>
  );
}
