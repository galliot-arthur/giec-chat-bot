import { Message, QuestionReturn } from "@/api/types";
import { NextRequest, NextResponse } from "next/server";

const askQuestion = async (messages: Message[]): Promise<QuestionReturn> => {
  const response = await fetch(`${process.env.BASE_URL}chat`, {
    method: "POST",
    headers: {
      Authorization: process.env.Authorization ?? "",
    },
    body: JSON.stringify({
      messages,
      chatbotId: process.env.CHATBOT_ID,
      stream: false,
      model: "gpt-3.5-turbo",
      temperature: 0,
    }),
  });

  return await response.json();
};

export async function POST(request: NextRequest) {
  const messages: Message[] = await request.json();
  const res = await askQuestion(messages);

  return NextResponse.json(res);
}
