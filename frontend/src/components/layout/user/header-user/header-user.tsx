"use client";

import { GlobeIcon, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { LinkNav } from "./link-nav/link-nav";
import { useCheckout } from "@/hooks/useCheckout";
import { useUseAuth } from "@/hooks/useAuth";

export function HeaderUser() {
  const { logout } = useUseAuth();
  const pathname = usePathname();
  const { cart } = useCheckout();

  return (
    <header className="flex justify-between items-center py-4 px-12 bg-background border-b border-primary-dark text-white">
      <GlobeIcon size={32} color="#0d9488" />

      <nav className="flex items-center gap-8">
        <LinkNav
          isActive={pathname === "/editar"}
          href="/editar"
          text="Editar meus dados"
        />

        <LinkNav
          isActive={pathname === "/produtos"}
          href="/produtos"
          text="Produtos"
        />

        <LinkNav
          isActive={pathname === "/pedidos"}
          href="/pedidos"
          text="Pedidos"
        />

        <LinkNav
          isActive={pathname === "/carrinho"}
          href="/carrinho"
          text="Carrinho"
          cart
          cartCount={cart.length}
        />

        <LogOutIcon
          size={20}
          color="#ffffff"
          onClick={logout}
          style={{ cursor: "pointer" }}
        />
      </nav>
    </header>
  );
}
