interface IModalRootProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalRoot({ children, className }: IModalRootProps) {
  return (
    <div
      className={`${className} fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-background-dark container-modal`}
    >
      {children}
    </div>
  );
}
