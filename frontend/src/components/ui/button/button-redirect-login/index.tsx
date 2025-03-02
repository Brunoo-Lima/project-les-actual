"use client";

import { useUseAuth } from "@/hooks/useAuth";
import { LogInIcon } from "lucide-react";

export function ButtonRedirectLogin() {
  const { handleChangeUser } = useUseAuth();

  return (
    <div className="fixed bottom-24 left-4 rounded-full bg-primary p-3 cursor-pointer shadow-sm shadow-primary transition duration-300 hover:bg-primary-dark hover:scale-105">
      <LogInIcon onClick={handleChangeUser} size={24} color="#000000" />
    </div>
  );
}
