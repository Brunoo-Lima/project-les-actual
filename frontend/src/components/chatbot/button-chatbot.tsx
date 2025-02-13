import { BotIcon } from "lucide-react";

interface IButtonChatbotProps {
  onClick: () => void;
}

export function ButtonChatbot({ onClick }: IButtonChatbotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="size-14 flex items-center justify-center bg-white rounded-full fixed right-4 bottom-36 "
    >
      <BotIcon color="#0d9488" size={32} />
    </button>
  );
}
