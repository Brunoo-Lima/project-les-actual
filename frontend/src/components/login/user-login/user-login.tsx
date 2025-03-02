"use client";

import Link from "next/link";
import { ButtonLogin } from "@/components/ui/button/button-login/button-login";
import { Input } from "@/components/ui/input/input";
import { TitleLogin } from "@/components/ui/title/title-login/title-login";
import { useUseAuth } from "@/hooks/useAuth";

export function UserLogin() {
  const { login } = useUseAuth();

  const onSubmit = async () => {
    await login("USER");
  };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <TitleLogin>Usuário</TitleLogin>

      <div className="space-y-4 w-96">
        <Input label="Email" placeholder="Digite seu email" />
        <Input
          label="Password"
          type="password"
          placeholder="Digite sua senha"
        />
      </div>

      <ButtonLogin type="button" text="Entrar" onClick={onSubmit} />

      <p className="text-sm -my-1">
        Não tem conta?{" "}
        <Link
          href={"/registrar"}
          className="text-primary font-semibold transition duration-300 hover:text-primary-dark"
        >
          Clique aqui
        </Link>
      </p>
    </div>
  );
}
