import { ButtonLogin } from '@/components/ui/button/button-login/button-login';
import { Input } from '@/components/ui/input/input';
import { TitleLogin } from '@/components/ui/title/title-login/title-login';
import { useRouter } from 'next/navigation';

export function AdminLogin() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-y-4">
      <TitleLogin>Administrador</TitleLogin>

      <div className="space-y-4 w-96 mt-6">
        <Input label="Email" placeholder="Digite seu email" />
        <Input
          label="Password"
          type="password"
          placeholder="Digite sua senha"
        />
      </div>

      <ButtonLogin
        type="button"
        text="Entrar"
        onClick={() => router.push('/vendas')}
      />
    </div>
  );
}
