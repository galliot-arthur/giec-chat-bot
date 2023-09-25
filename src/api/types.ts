import { Dispatch, SetStateAction } from "react";

export type Message = { content: string; role: "user" | "assistant" };

export type QuestionReturn = { text: string } | { message: string };

export type AppState = { loading?: boolean; error?: string };

export type AppStateAccess = [boolean, Dispatch<SetStateAction<AppState>>];
