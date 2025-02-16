import { Product } from "@/components/layout/admin/product/product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de produtos",
  description: "Página de lista de produtos",
};

export default function ProductPage() {
  return <Product />;
}
