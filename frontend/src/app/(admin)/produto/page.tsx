import { Product } from '@/components/layout/admin/product/product';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastrar produtos',
  description: 'Página de cadastrar produtos',
};

export default function ProductPage() {
  return <Product />;
}
