"use client";
import classNames from "classnames";
import { RefObject, useEffect, useRef, useState } from "react";

const speed = 20;

export default function MessageBuble({
  message,
  fromUser,
}: {
  message: string;
  fromUser: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [message]
  );

  return (
    <div className="flex flex-col items-center mb-2" ref={bottomRef}>
      <span
        className={classNames(
          "message max-w-sm",
          fromUser ? "message-user" : "message-bot"
        )}
      >
        {message}
      </span>
    </div>
  );
}
