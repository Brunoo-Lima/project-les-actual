import { ShoppingCart } from '@/components/layout/shopping-cart/shopping-cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'Página de carrinho de compras',
};

export default function ShoppingCartPage() {
  return <ShoppingCart />;
}
