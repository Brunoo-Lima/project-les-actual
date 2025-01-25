import { UserRegister } from '@/components/login/user-login/user-register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrar',
  description: 'Página de registrar',
};

export default function RegisterPage() {
  return <UserRegister />;
}
