"use client";

import { I18nProviderClient } from "@/locales/client";
import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react";
import type { ChatModelAdapter } from "@assistant-ui/react";

export const Providers = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  // Adapter personnalisé pour l'API assistant
  const chatAdapter: ChatModelAdapter = {
    async *run({ messages, abortSignal }) {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages }),
          signal: abortSignal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        yield {
          role: "assistant" as const,
          content: [{ 
            type: "text" as const, 
            text: data.message || data.content || "Réponse reçue" 
          }],
        };
      } catch (error) {
        console.error("Assistant error:", error);
        yield {
          role: "assistant" as const,
          content: [{ 
            type: "text" as const, 
            text: "Désolé, une erreur s'est produite." 
          }],
        };
      }
    },
  };

  // Configuration du runtime Assistant UI
  const runtime = useLocalRuntime(chatAdapter);

  return (
    <I18nProviderClient locale={params.locale}>
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </I18nProviderClient>
  );
};
