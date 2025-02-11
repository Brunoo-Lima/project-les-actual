import { Users } from '@/components/layout/admin/users/users';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Usuários',
};

export default function UsersPage() {
  return <Users />;
}
