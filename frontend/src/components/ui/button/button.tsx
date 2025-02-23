import { ReactNode } from "react";

interface IButtonProps {
  icon?: ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export function Button({
  icon,
  text,
  className,
  onClick,
  type = "button",
  disabled,
}: IButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} text-background p-2 rounded-md flex items-center justify-center gap-2 transition duration-300`}
    >
      {icon && icon}
      <p>{text}</p>
    </button>
  );
}

