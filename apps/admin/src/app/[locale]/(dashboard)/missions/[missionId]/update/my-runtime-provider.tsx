"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { useChat } from "@ai-sdk/react";

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chat = useChat({
    api: "/api/chat",
    initialMessages: [],
    onResponse: async (res) => {
      console.log("useChat response status:", res.status);
      console.log(
        "useChat response content-type:",
        res.headers.get("content-type")
      );
      const t = await res.clone().text();
      console.log("useChat raw response text:", t.slice(0, 200));
    },
    onError: (err) => console.error("useChat error:", err),
    onFinish: (msg) => console.log("useChat finished assistant message:", msg),
  });

  const runtime = useAISDKRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
