interface IModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalContent({ children, className }: IModalContentProps) {
  return <div className={`${className}`}>{children}</div>;
}
