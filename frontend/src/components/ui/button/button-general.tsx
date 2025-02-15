import { ReactNode } from "react";

interface IButtonGeneralProps {
  icon?: ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export function ButtonGeneral({
  icon,
  text,
  className,
  onClick,
  type = "button",
}: IButtonGeneralProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-primary text-background p-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300`}
    >
      {icon && icon}
      <p>{text}</p>
    </button>
  );
}
