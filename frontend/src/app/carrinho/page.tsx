import { MultiStepForm } from '@/components/layout/shopping-cart/forms/multi-step-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'Página de carrinho de compras',
};

export default function ShoppingCartPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Carrinho</h1>
      <MultiStepForm />
    </>
  );
}
