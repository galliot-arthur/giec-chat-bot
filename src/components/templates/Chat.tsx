"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
import { useState } from "react";
import { AppState } from "@/api/types";

const queryClient = new QueryClient();

export default function Chat() {
  const [appState, setAppState] = useState<AppState>({});

  return (
    <QueryClientProvider client={queryClient}>
      <Messages appState={appState} />

      <WriteMessage appState={appState} setAppState={setAppState} />
    </QueryClientProvider>
  );
}
