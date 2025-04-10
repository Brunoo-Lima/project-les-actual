"use client";

import Link from "next/link";
import { ButtonLogin } from "@/components/ui/button/button-login/button-login";
import { Input } from "@/components/ui/input/input";
import { TitleLogin } from "@/components/ui/title/title-login/title-login";
import { useUseAuth } from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ILoginSchemaUser,
  LoginSchema,
} from "@/components/validation/login-schema-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UserLogin() {
  const { login } = useUseAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginSchemaUser>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginSchemaUser> = async ({
    email,
    password,
  }: ILoginSchemaUser) => {
    try {
      await login(email, password, "CLIENT");
    } catch (error) {
      toast.error("Email ou senha incorretos!");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <TitleLogin>Cliente</TitleLogin>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-96 flex items-center flex-col"
      >
        <Input
          label="Email"
          placeholder="Digite seu email"
          {...register("email")}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
          error={errors.password}
        />

        <ButtonLogin
          type="submit"
          text={isSubmitting ? "Carregando..." : "Entrar"}
          disabled={isSubmitting}
        />
      </form>

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
