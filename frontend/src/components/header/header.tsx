'use client';

import { usePathname } from 'next/navigation';
import { LinkNav } from './link-nav/link-nav';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-4 px-12 bg-background border-b border-primary-dark text-white">
      <h1>Logo</h1>

      <nav className="flex gap-8">
        <LinkNav
          isActive={pathname === '/inicio'}
          href="/inicio"
          text="Início"
        />
        <LinkNav
          isActive={pathname === '/produto'}
          href="/produto"
          text="Produtos"
        />
        <LinkNav
          isActive={pathname === '/vendas'}
          href="/vendas"
          text="Vendas"
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
