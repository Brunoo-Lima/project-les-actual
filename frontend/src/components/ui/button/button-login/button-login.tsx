interface IButtonLoginProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button";
  className?: string;
  text: string;
}

export function ButtonLogin({
  type,
  className,
  text,
  ...rest
}: IButtonLoginProps) {
  return (
    <button
      type={type}
      className="bg-primary text-background p-1 mt-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300 w-48"
      {...rest}
    >
      {text}
    </button>
  );
}
