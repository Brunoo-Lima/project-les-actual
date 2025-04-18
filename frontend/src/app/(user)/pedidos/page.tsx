import { Orders } from "@/components/layout/user/orders/orders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "Página de pedidos",
};

export default function OrdersPage() {
  return <Orders />;
}
