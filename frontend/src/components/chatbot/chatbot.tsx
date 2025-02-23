"use client";

import { useState } from "react";

import { SendIcon } from "lucide-react";
import Image from "next/image";
import { InputChatbot } from "../ui/input/input-chatbot";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function Chatbot() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, inputValue]);
    setInputValue("");
  };

  return (
    <Card className="w-[360px] rounded-3xl bg-white fixed right-20 bottom-12">
      <CardHeader className="flex flex-row gap-2 items-center justify-center w-full h-[69px] bg-primary-dark">
        <Image
          src={"/img/bot-image.svg"}
          alt="Icone bot"
          width={30}
          height={30}
        />
        <p className="text-white text-lg font-medium">Atendimento virtual</p>
      </CardHeader>

      <CardContent className="p-2">
        <ScrollArea className="h-[388px] flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-primary flex flex-col mt-3 items-center justify-center rounded-2xl py-2 px-4 min-w-20 max-w-[80%] self-end text-black"
            >
              {msg}
            </div>
          ))}
        </ScrollArea>
      </CardContent>

      <CardFooter className="bg-white py-4 flex items-center justify-center gap-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full flex gap-2"
        >
          <InputChatbot
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className="bg-primary-dark size-11 flex items-center justify-center rounded-full transition duration-300 hover:bg-primary-dark/80"
          >
            <SendIcon />
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}
