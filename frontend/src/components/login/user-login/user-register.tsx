'use client';

import { ButtonLogin } from '@/components/ui/button/button-login/button-login';
import { Input } from '@/components/ui/input/input';
import { TitleLogin } from '@/components/ui/title/title-login/title-login';
import { useRouter } from 'next/navigation';

export function UserRegister() {
  const router = useRouter();

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-4 items-center border border-background-dark rounded-md p-4 h-[450px] w-[500px]">
        <TitleLogin>Cadastrar</TitleLogin>

        <div className="space-y-4 w-96 mt-6">
          <Input label="Email" placeholder="Digite seu email" />
          <Input label="Senha" type="password" placeholder="Digite sua senha" />
          <Input
            label="Confirmação de senha"
            type="password"
            placeholder="Digite sua senha novamente"
          />
        </div>

        <ButtonLogin
          type="button"
          text="Registrar"
          onClick={() => router.push('/')}
        />
      </div>
    </section>
  );
}
