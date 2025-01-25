import { ReactNode } from 'react';

interface ITitlePageProps {
  title: string;
  icon?: ReactNode;
}

export function TitlePage({ title, icon }: ITitlePageProps) {
  return (
    <div className="flex gap-2 items-center mb-8">
      {icon && icon}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
