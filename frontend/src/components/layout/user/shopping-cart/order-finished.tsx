'use client';

import { useCheckout } from '@/hooks/useCheckout';

export function OrderFinished() {
  const { getOrderSummary } = useCheckout();

  const order = getOrderSummary();

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
      {order.address}
      {order.payment}
    </div>
  );
}
