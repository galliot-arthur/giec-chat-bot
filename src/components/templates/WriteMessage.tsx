"use client";
import { askQuestion } from "@/api/fetch";
import { AppState, Message } from "@/api/types";
import classNames from "classnames";
import { Dispatch, useState } from "react";
import { useQueryClient } from "react-query";

type Props = { appState: AppState; setAppState: Dispatch<AppState> };
export default function WriteMessage({ appState, setAppState }: Props) {
  const [question, setQuestion] = useState<string>("");

  const queryClient = useQueryClient();

  const onClick = async () => {
    setAppState({ loading: true });

    const messages = queryClient.getQueryData<Message[]>("messages");
    if (!messages) throw new Error("Error getting messages cach");

    setQuestion("");

    const updatedMessages: Message[] = [
      ...messages,
      { content: question, role: "user" },
    ];

    queryClient.setQueryData<Message[]>("messages", updatedMessages);

    const response = await askQuestion(updatedMessages);

    if ("text" in response) {
      queryClient.setQueryData<Message[]>("messages", [
        ...updatedMessages,
        { content: response.text, role: "assistant" },
      ]);
      setAppState({});
    }
    if ("message" in response) setAppState({ error: response.message });
  };

  return (
    <div className="mt-4 w-full">
      <form
        className="input-container flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
        aria-disabled={appState.loading}
      >
        <input
          type="text"
          placeholder={appState.loading ? "" : "Poser votre question ici"}
          className="w-full input"
          value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}
          disabled={appState.loading}
          aria-label="Poser votre question ici"
          aria-disabled={appState.loading}
        />

        <button
          className={classNames(
            "ml-3 rounded-full bg-red p-3 hover:bg-gray-100",
            appState.loading && "opacity-60 bg-gray-100"
          )}
          type="submit"
          title="Envoyer"
          aria-disabled={appState.loading}
          role="submit"
          disabled={appState.loading}
        >
          <img src="/send-icon.svg" />
        </button>
      </form>
    </div>
  );
}
