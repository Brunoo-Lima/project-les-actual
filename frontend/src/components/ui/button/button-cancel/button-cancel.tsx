interface IButtonCancelProps {
  onClick?: () => void;
  className?: string;
  text: string;
}

export function ButtonCancel({ onClick, className, text }: IButtonCancelProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} bg-error-dark text-primary-light p-2 rounded-md w-48 transition duration-300 hover:bg-error`}
    >
      {text}
    </button>
  );
}
