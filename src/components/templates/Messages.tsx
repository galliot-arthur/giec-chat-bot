"use client";
import { AppState, AppStateAccess, Message } from "@/api/types";
import { useQuery } from "react-query";
import MessageBuble from "../atoms/MessageBuble";
import { initializeMessages } from "@/api/fetch";
import Error from "../atoms/Error";

type Props = {
  appState: AppState;
};

export default function Messages({ appState }: Props) {
  const {
    data: messages,
    error,
    isError,
  } = useQuery<Message[]>("messages", initializeMessages, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="w-full card">
      {messages?.map((m, i) => (
        <MessageBuble
          key={`${m}-${i}`}
          message={m.content}
          fromUser={m.role === "user"}
        />
      ))}
      {appState.loading && (
        <div className="font-black text-4xl flex">
          <div className="animate-flip animate-delay-1">•</div>
          <div className="animate-flip">•</div>
          <div className="animate-flip animate-delay-2">•</div>
        </div>
      )}
      {appState.error && <Error error={appState.error} />}
    </div>
  );
}
