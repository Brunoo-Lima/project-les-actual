import { ReactNode } from 'react';

interface IButtonGeneralProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export function ButtonGeneral({ icon, text, className }: IButtonGeneralProps) {
  return (
    <button
      className={`${className} bg-primary text-background px-2 p-1 mt-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300`}
    >
      {icon && icon}
      <p>{text}</p>
    </button>
  );
}
