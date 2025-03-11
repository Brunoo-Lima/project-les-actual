"use client";

import { ButtonLogin } from "@/components/ui/button/button-login/button-login";
import { Input } from "@/components/ui/input/input";
import { TitleLogin } from "@/components/ui/title/title-login/title-login";
import {
  ILoginSchemaUser,
  LoginSchema,
} from "@/components/validation/login-schema-form";
import { useUseAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export function AdminLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchemaUser>({
    resolver: yupResolver(LoginSchema),
  });
  const { login } = useUseAuth();

  const onSubmit: SubmitHandler<ILoginSchemaUser> = async ({
    email,
    password,
  }: ILoginSchemaUser) => {
    try {
      await login(email, password, "ADMIN");

      // router.push("/vendas");
    } catch (error) {
      toast.error("Email ou senha incorretos!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <TitleLogin>Administrador</TitleLogin>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-96 mt-6 flex items-center flex-col"
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

        <ButtonLogin type="submit" text="Entrar" />
      </form>
    </div>
  );
}
