import { EditUser } from "@/components/layout/user/edit-user/edit-user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar",
  description: "Página de editar",
};

export default function EditPage() {
  return <EditUser />;
}
