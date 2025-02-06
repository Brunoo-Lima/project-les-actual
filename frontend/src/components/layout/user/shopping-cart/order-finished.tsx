'use client';

import { useCheckout } from '@/hooks/useCheckout';

export function OrderFinished() {
  const { order } = useCheckout();

  if (!order) return;

  return (
    <div>
      Pedido Concluido!
      {order.items.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="" />

          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
      {order.total}
      <div>
        <p>Endereço de cobrança: {order.address?.charge}</p>
        <p>Rua: {order.address?.street}</p>
        <p>Cep: {order.address?.zipCode}</p>
        <p>Número: {order.address?.number}</p>
      </div>
      <div>
        <p>Bandeira: {order.payment?.flag}</p>
        <p>Numero: {order.payment?.number}</p>
      </div>
    </div>
  );
}
