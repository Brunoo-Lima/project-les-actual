export function ModalBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
      {children}
    </div>
  );
}
