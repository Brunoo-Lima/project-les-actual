'use client';

import { LinkNav } from '@/components/header/link-nav/link-nav';
import { usePathname } from 'next/navigation';

export function HeaderUser() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-4 px-12 bg-background border-b border-primary-dark text-white">
      <h1>Logo</h1>

      <nav className="flex gap-8">
        <LinkNav
          isActive={pathname === '/produtos'}
          href="/produtos"
          text="Produtos"
        />

        <LinkNav
          isActive={pathname === '/carrinho'}
          href="/carrinho"
          text="Carrinho"
          cart
          cartCount={0}
        />
      </nav>
    </header>
  );
}
