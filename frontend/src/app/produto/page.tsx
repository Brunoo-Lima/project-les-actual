import { Product } from '@/components/layout/product/product';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Página de produtos',
};

export default function ProductPage() {
  return <Product />;
}
