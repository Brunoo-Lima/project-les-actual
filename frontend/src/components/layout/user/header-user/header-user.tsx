'use client';

import { GlobeIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LinkNav } from './link-nav/link-nav';
import { useData } from '@/hooks/useData';

export function HeaderUser() {
  const pathname = usePathname();
  const { cartItems } = useData();

  return (
    <header className="flex justify-between items-center py-4 px-12 bg-background border-b border-primary-dark text-white">
      <GlobeIcon size={32} color="#0d9488" />

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
          cartCount={cartItems.length}
        />
      </nav>
    </header>
  );
}
