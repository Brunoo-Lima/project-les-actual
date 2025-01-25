'use client';

import { usePathname } from 'next/navigation';
import { LinkNav } from './link-nav/link-nav';
import { GlobeIcon } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-4 px-12 bg-background border-b border-primary-dark text-white">
      <GlobeIcon size={32} color="#0d9488" />

      <nav className="flex gap-8">
        <LinkNav
          isActive={pathname === '/produto'}
          href="/produto"
          text="Produto"
        />
        <LinkNav
          isActive={pathname === '/vendas'}
          href="/vendas"
          text="Vendas"
        />
      </nav>
    </header>
  );
}
