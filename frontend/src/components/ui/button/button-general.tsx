import { ReactNode } from 'react';

interface IButtonGeneralProps {
  icon?: ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}

export function ButtonGeneral({
  icon,
  text,
  className,
  onClick,
}: IButtonGeneralProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} bg-primary text-background p-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300`}
    >
      {icon && icon}
      <p>{text}</p>
    </button>
  );
}
