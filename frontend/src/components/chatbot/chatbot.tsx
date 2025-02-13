"use client";

import { SendIcon } from "lucide-react";
import Image from "next/image";
import { InputChatbot } from "../ui/input/input-chatbot";
import { useState } from "react";

export function Chatbot() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, inputValue]);
    setInputValue("");
  };

  return (
    <div className="w-[360px] h-[640px] rounded-[1.5625rem] overflow-hidden bg-white fixed right-6 top-20">
      <header className="flex gap-4 items-center justify-center w-full h-[69px] bg-primary-dark">
        <Image
          src={"/img/bot-image.svg"}
          alt="Icone bot"
          width={30}
          height={30}
        />
        <p className="text-white text-lg font-medium">Atendimento virtual</p>
      </header>

      <div className="flex flex-col w-full p-5 relative">
        <div className="flex flex-col gap-4 overflow-auto h-[488px] container-modal pb-4 relative">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-primary flex items-center justify-center rounded-2xl py-2 px-4 min-w-20 max-w-[80%] self-end text-black"
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="bg-white h-20 py-4 flex items-center justify-center gap-3 absolute -bottom-10 left-0 right-0">
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
        </div>
      </div>
    </div>
  );
}
