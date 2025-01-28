import { ReactNode } from 'react';

interface IModalButtonProps {
  children: ReactNode;
  className?: string;
}

export function ModalButton({ children, className }: IModalButtonProps) {
  return <button className={`${className} `}>{children}</button>;
}
