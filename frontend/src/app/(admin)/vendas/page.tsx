import { Dashboard } from '@/components/layout/admin/sale/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendas',
  description: 'Página de vendas',
};

export default function SalePage() {
  return <Dashboard />;
}
