import { Users } from "@/components/layout/admin/users/users";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
};

export default async function ClientsPage() {
  return <Users />;
}
