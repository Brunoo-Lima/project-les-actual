"use client";

import { useEffect, useState } from "react";
import { AdminLogin } from "./admin-login/admin-login";
import { UserLogin } from "./user-login/user-login";
import { ButtonOptionLogin } from "../ui/button/button-option-login";

export function Login() {
  const [option, setOption] = useState<"ADMIN" | "CLIENT">("CLIENT");

  useEffect(() => {
    setOption("CLIENT");
  }, []);

  const handleChangeOption = (option: "ADMIN" | "CLIENT") => {
    setOption(option);
  };

  if (option === null) return null;

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col border border-background-dark rounded-md min-h-[400px] w-[500px]">
        <div className="flex mb-6">
          <ButtonOptionLogin
            type="button"
            onClick={() => handleChangeOption("CLIENT")}
            text="Cliente"
            className={` ${
              option === "CLIENT" &&
              "bg-primary text-background rounded-tl-md font-bold"
            }`}
          />

          <ButtonOptionLogin
            type="button"
            onClick={() => handleChangeOption("ADMIN")}
            text="Administrador"
            className={`${
              option === "ADMIN" && "bg-primary text-background font-bold"
            }`}
          />
        </div>

        <div className="p-4">
          {option === "ADMIN" ? <AdminLogin /> : <UserLogin />}
        </div>
      </div>
    </section>
  );
}
