import { OrderFinished } from '@/components/layout/user/shopping-cart/order-finished';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedido',
  description: 'Página de pedido concluído',
};

// TODO: Aqui posso fazer algum esquema de pedido em andamento, realizado ou cancelado, algo simulando o processo de compra

// Colocar algum delay no backend que leve um tempo para dar como concluido

// Colocar talvez parcelamento do pedido talvez

export default function Order() {
  return <OrderFinished />;
}
