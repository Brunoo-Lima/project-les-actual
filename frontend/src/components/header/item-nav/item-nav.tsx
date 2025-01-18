import Link from 'next/link';

interface IItemNavProps {
  href: string;
  text: string;
}

export function ItemNav({ href, text }: IItemNavProps) {
  return (
    <nav className="relative flex flex-col items-center">
      <Link href={href}>{text}</Link>
    </nav>
  );
}
