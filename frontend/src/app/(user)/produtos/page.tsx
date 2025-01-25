import { Products } from '@/components/layout/user/products/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Página de produtos',
};

export default function ProductsPage() {
  return <Products />;
}
