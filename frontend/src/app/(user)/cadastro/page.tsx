import { RegisterUser } from "@/components/layout/user/forms/register-user/register-user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Página de cadastro",
};

export default function RegisterPage() {
  return <RegisterUser />;
}
