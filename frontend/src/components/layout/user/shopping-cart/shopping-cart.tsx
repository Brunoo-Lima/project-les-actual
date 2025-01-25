'use client';

import { useState } from 'react';
import { ButtonsQuantity } from './buttons-quantity/buttons-quantity';
import { Trash2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input/input';

const initialItems = [
  {
    id: 1,
    name: 'Itachi Uchiha - Naruto',
    price: 200,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Ace - One Piece',
    price: 350,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Sukuna - Jujustu Kaisen',
    price: 400,
    quantity: 1,
  },
];

export function ShoppingCart() {
  const [items, setItems] = useState(initialItems);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [newCoupon, setNewCoupon] = useState<string>('');
  const [discountValueCoupon, setDiscountValueCoupon] = useState<number>(0);

  const frete = 20;

  const valueTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalTotal = valueTotal + frete - discountValueCoupon;

  const handleIncrement = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setItems((prev) =>
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
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-2 gap-x-16 place-items-start mt-8 container mx-auto">
      <div className="border border-background-light rounded-lg flex flex-col gap-4 w-[600px] h-[500px]">
        <div className="flex flex-col gap-4 flex-1 overflow-auto p-6 container-shopping-cart">
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md"
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <small className="italic">R$ {item.price}</small>
                  </div>

                  <div className="flex flex-col items-start gap-4">
                    <ButtonsQuantity
                      quantity={item.quantity}
                      handleIncrement={() => handleIncrement(item.id)}
                      handleDecrement={() => handleDecrement(item.id)}
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-max flex items-center gap-2 self-center bg-background px-2 rounded-md text-sm transition duration-300 hover:bg-gray-800"
                    >
                      <Trash2Icon size={12} color="#ffffff" />
                      Remover
                    </button>
                  </div>

                  <div className="w-24 text-right">
                    <p className="text-lg font-semibold">
                      R$ {item.quantity * item.price}
                    </p>
                  </div>
                </div>
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
            className="bg-primary-dark text-primary-light px-4 py-2 rounded-md self-end"
          >
            Aplicar Cupom
          </button>
        </div>

        <div className="flex justify-between">
          <p className="text-base font-semibold">Subtotal</p>
          <p className="text-base font-semibold">R$ {valueTotal}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-base font-semibold">Frete</p>
          <p className="text-base font-semibold">R$ {frete}</p>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between">
            <p className="text-base font-semibold">Cupom ({appliedCoupon})</p>
            <p className="text-base font-semibold">
              -R$ {discountValueCoupon.toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-lg font-semibold">{finalTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
