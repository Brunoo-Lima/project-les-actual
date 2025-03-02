import { RegisterUser } from "@/components/layout/user/forms/register-user/register-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar",
  description: "Página de registrar",
};

export default function RegisterPage() {
  return <RegisterUser />;
}
