import { XIcon } from 'lucide-react';

interface IModalHeaderProps {
  title: string;
  onClick?: () => void;
}

export function ModalHeader({ title, onClick }: IModalHeaderProps) {
  return (
    <header className="flex justify-between items-center text-primary-light">
      <h1 className="text-2xl font-bold">{title}</h1>
      <XIcon
        size={24}
        color="#ffffff"
        onClick={onClick}
        className="cursor-pointer"
      />
    </header>
  );
}
