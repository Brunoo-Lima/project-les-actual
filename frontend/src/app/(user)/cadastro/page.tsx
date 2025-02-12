import { RegisterUser } from "@/components/layout/user/register-user/register-user";
import type { Metadata } from "next";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <RegisterUser />
    </div>
  );
}

