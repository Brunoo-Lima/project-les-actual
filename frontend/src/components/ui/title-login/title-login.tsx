interface ITitleLoginProps {
  children: React.ReactNode;
}

export function TitleLogin({ children }: ITitleLoginProps) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}
