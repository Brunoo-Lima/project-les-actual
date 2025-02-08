import { Login } from '@/components/login/login';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function HomePage() {
  return <Login />;
}
