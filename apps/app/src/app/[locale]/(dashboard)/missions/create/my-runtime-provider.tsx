"use client";

import { version as aiVersion } from "ai/package.json";

console.log("AI package version used by /api/chat:", aiVersion);

import * as React from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { useChat } from "@ai-sdk/react";

export function MyRuntimeProvider({ children }: { children: React.ReactNode }) {
  const chat = useChat({
    api: "/api/chat",
    initialMessages: [],

    onResponse: async (res) => {
      console.log("useChat response status:", res.status);
      console.log(
        "useChat response content-type:",
        res.headers.get("content-type")
      );

      // Important: lire un clone (ne consomme pas le stream principal)
      const t = await res.clone().text();
      console.log("useChat raw response text:", t.slice(0, 200));
    },

    onError: (err) => {
      console.error("useChat error:", err);
    },

    onFinish: (msg) => {
      console.log("useChat finished assistant message:", msg);
    },
  });

  React.useEffect(() => {
    console.log("useChat messages:", chat.messages);
  }, [chat.messages]);

  const runtime = useAISDKRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
