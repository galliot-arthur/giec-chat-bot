import { Message, QuestionReturn } from "./types";

export const initializeMessages = (): Message[] => [
  { content: "Hello !", role: "assistant" },
  {
    content: "Que veux tu savoir sur le dernier rapport du GIEC ?",
    role: "assistant",
  },
];

export const askQuestion = async (
  messages: Message[]
): Promise<QuestionReturn> => {
  const response = await fetch(`api`, {
    method: "POST",
    body: JSON.stringify(messages),
  });

  return await response.json();
};
