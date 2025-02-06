import { MultiStepForm } from '@/components/layout/user/shopping-cart/forms/multi-step-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'Página de carrinho de compras',
};

export default function ShoppingCartPage() {
  return (
    <>
      <MultiStepForm />
    </>
  );
}
