import { useRouter } from 'next/navigation';

export function UserLogin() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <h1>Usuário</h1>

      <button
        type="button"
        onClick={() => router.push('/produtos')}
        className="bg-primary text-background p-1 mt-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300 w-24"
      >
        Entrar
      </button>
    </div>
  );
}
