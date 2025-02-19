import { ListOrders } from "@/components/layout/admin/list-orders/list-orders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página de pedidos",
};

export default function ListOrdersPage() {
  return <ListOrders />;
}
