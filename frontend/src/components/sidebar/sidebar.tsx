"use client";

import { useState } from "react";
import { Tag } from "@phosphor-icons/react";
import Item from "./item/item";
import {
  ClipboardListIcon,
  GlobeIcon,
  LibraryIcon,
  LogOut,
  UsersIcon,
} from "lucide-react";
import { Tooltip } from "../ui/tooltip/tooltip";
import { useUseAuth } from "@/hooks/useAuth";

export function Sidebar() {
  const { logout } = useUseAuth();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleMouseEnter = (tooltip: string) => {
    setActiveTooltip(tooltip);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="h-screen bg-background w-16 min-w-16 py-4 pl-2">
      <div className="flex flex-col gap-y-3 pb-4 w-16 relative shadow-md py-8 h-full  border border-primary-dark rounded-lg">
        <div className="flex justify-center">
          <GlobeIcon size={32} color="#0d9488" />
        </div>

        <div className="flex-1 my-10">
          <nav className="flex flex-col items-center gap-y-6">
            <Item
              activeTooltip={activeTooltip}
              href="/vendas"
              icon={<Tag size={24} color="#2DD4BF" weight="bold" />}
              text="Vendas"
              handleMouseEnter={() => handleMouseEnter("sale")}
              handleMouseLeave={handleMouseLeave}
              tooltip="sale"
            />

            <Item
              activeTooltip={activeTooltip}
              href="/produto"
              icon={<LibraryIcon size={24} color="#2DD4BF" />}
              text="Produto"
              handleMouseEnter={() => handleMouseEnter("product")}
              handleMouseLeave={handleMouseLeave}
              tooltip="product"
            />

            <Item
              activeTooltip={activeTooltip}
              href="/lista-de-pedidos"
              icon={<ClipboardListIcon size={24} color="#2DD4BF" />}
              text="Pedidos"
              handleMouseEnter={() => handleMouseEnter("orders")}
              handleMouseLeave={handleMouseLeave}
              tooltip="orders"
            />

            <Item
              activeTooltip={activeTooltip}
              href="/clientes"
              icon={<UsersIcon size={24} color="#2DD4BF" />}
              text="Clientes"
              handleMouseEnter={() => handleMouseEnter("users")}
              handleMouseLeave={handleMouseLeave}
              tooltip="users"
            />
          </nav>
        </div>

        <div
          className="relative flex flex-col items-center"
          onMouseEnter={() => handleMouseEnter("logout")}
          onMouseLeave={handleMouseLeave}
          onClick={logout}
        >
          <button type="button" className="m-auto w-max">
            <LogOut size={24} color="#2DD4BF" />
          </button>
          {activeTooltip === "logout" && <Tooltip text="Sair" />}
        </div>
      </div>
    </div>
  );
}
