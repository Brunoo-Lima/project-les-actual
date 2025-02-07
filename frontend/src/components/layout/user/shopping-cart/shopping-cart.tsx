'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input/input';
import { FormatValue } from '@/utils/format-value';
import { ItemCart } from './item-cart';
import { useCheckout } from '@/hooks/useCheckout';
import { redirect } from 'next/navigation';

export function ShoppingCart() {
  const [newCoupon, setNewCoupon] = useState<string>('');
  const {
    cart,
    incrementItemCart,
    decrementItemCart,
    removeItemCart,
    applyCoupon,
    order,
  } = useCheckout();

  const handleApplyNewCoupon = () => {
    applyCoupon(newCoupon);
    setNewCoupon('');
  };

  // if (!order || !order.items) return redirect('/produtos');

  return (
    <div className="grid grid-cols-2 gap-x-16 place-items-start mt-8 container mx-auto">
      <div className="border border-background-light rounded-lg flex flex-col gap-4 w-[600px] h-[500px]">
        <div className="flex flex-col gap-4 flex-1 overflow-auto p-6 container-shopping-cart">
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <ItemCart
                  key={item.id}
                  item={item}
                  handleIncrement={incrementItemCart}
                  handleDecrement={decrementItemCart}
                  handleRemoveItem={removeItemCart}
                />
              ))}
            </>
          ) : (
            <p className="text-lg font-semibold">Nenhum item no carrinho</p>
          )}
        </div>
      </div>

      <div className="flex flex-col border border-background-light rounded-lg p-6 w-[450px] h-max">
        <div className="mb-4 flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Digite o cupom"
            label="Cupom"
            value={newCoupon}
            onChange={(e) => setNewCoupon(e.target.value)}
          />

          <button
            type="button"
            onClick={handleApplyNewCoupon}
            className="bg-primary-dark text-primary-light px-4 py-2 w-64 rounded-md self-end"
          >
            Aplicar Cupom
          </button>
        </div>

        <div className="flex justify-between *:text-base *:font-semibold">
          <p>Subtotal</p>
          <p>
            {FormatValue(
              order.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )
            )}
          </p>
        </div>

        <div className="flex justify-between *:text-base *:font-semibold">
          <p>Frete</p>
          <p>{FormatValue(order.freight)}</p>
        </div>

        {order.coupon && (
          <div className="flex justify-between *:text-base *:font-semibold">
            <p>Cupom ({order.coupon})</p>
            <p> -{FormatValue(order.discountValue)}</p>
          </div>
        )}

        <div className="flex justify-between *:text-lg *:font-semibold">
          <p>Total</p>
          <p>{FormatValue(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
