import { Orders } from '@/components/layout/user/orders/orders';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedidos',
  description: 'Página de pedidos',
};

// TODO: Aqui posso fazer algum esquema de pedido em andamento, realizado ou cancelado, algo simulando o processo de compra

// Colocar algum delay no backend que leve um tempo para dar como concluido

// Colocar talvez parcelamento do pedido talvez

export default function OrdersPage() {
  return <Orders />;
}
