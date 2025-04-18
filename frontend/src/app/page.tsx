import type { Metadata } from "next";
import { Login } from "@/components/login/login";

export const metadata: Metadata = {
  title: "Login",
  description: "Página de login",
};

export default function Home() {
  return <Login />;
}
