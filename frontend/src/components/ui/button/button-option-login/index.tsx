interface IButtonOptionLoginProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export function ButtonOptionLogin({
  type,
  onClick,
  className,
  text,
  ...rest
}: IButtonOptionLoginProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-32 h-9 text-base border-b border-r border-background-dark ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}
