interface IButtonCancelProps {
  onClick?: () => void;
  className?: string;
  text: string;
  type?: "submit" | "reset" | "button";
}

export function ButtonCancel({
  onClick,
  className,
  text,
  type = "button",
}: IButtonCancelProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-error-dark text-primary-light p-2 rounded-md w-48 transition duration-300 hover:bg-error`}
    >
      {text}
    </button>
  );
}
