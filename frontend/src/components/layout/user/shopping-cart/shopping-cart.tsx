'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input/input';
import { FormatValue } from '@/utils/format-value';
import { ItemCart } from './item-cart';
import { initialItems } from '@/mocks/initial-items-cart';
import { useData } from '@/hooks/useData';
import { useFormContext } from 'react-hook-form';

export function ShoppingCart() {
  const [items, setItems] = useState(initialItems);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [newCoupon, setNewCoupon] = useState<string>('');
  const [discountValueCoupon, setDiscountValueCoupon] = useState<number>(0);
  const { cartItems, setCartItems } = useData();
  const { register } = useFormContext();

  const frete = 20;

  const valueTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalTotal = valueTotal + frete - discountValueCoupon;

  const handleIncrement = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleApplyNewCoupon = () => {
    if (newCoupon === 'PROMO10') {
      setAppliedCoupon(newCoupon);
      setDiscountValueCoupon(10);
    } else if (newCoupon === 'DESCONTO20') {
      setAppliedCoupon(newCoupon);
      setDiscountValueCoupon(valueTotal * 0.2);
    } else {
      alert('Cupom inválido!');
    }
    setNewCoupon('');
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-2 gap-x-16 place-items-start mt-8 container mx-auto">
      <div className="border border-background-light rounded-lg flex flex-col gap-4 w-[600px] h-[500px]">
        <div className="flex flex-col gap-4 flex-1 overflow-auto p-6 container-shopping-cart">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <ItemCart
                  key={item.id}
                  item={item}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleRemoveItem={handleRemoveItem}
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
            {...register('coupon')}
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
          <p>{FormatValue(valueTotal)}</p>
        </div>

        <div className="flex justify-between *:text-base *:font-semibold">
          <p>Frete</p>
          <p>{FormatValue(frete)}</p>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between *:text-base *:font-semibold">
            <p>Cupom ({appliedCoupon})</p>
            <p> -{FormatValue(discountValueCoupon)}</p>
          </div>
        )}

        <div className="flex justify-between *:text-lg *:font-semibold">
          <p>Total</p>
          <p>{FormatValue(finalTotal)}</p>
        </div>
      </div>
    </div>
  );
}
