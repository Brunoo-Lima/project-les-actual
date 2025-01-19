'use client';

import { useState } from 'react';
import { ButtonsQuantity } from './buttons-quantity/buttons-quantity';
import { Trash2Icon } from 'lucide-react';

const initialItems = [
  {
    id: 1,
    name: 'Itachi Uchiha - Naruto',
    price: 200,
    quantity: 0,
  },
  {
    id: 2,
    name: 'Ace - One Piece',
    price: 350,
    quantity: 0,
  },
  {
    id: 3,
    name: 'Sukuna - Jujustu Kaisen',
    price: 400,
    quantity: 0,
  },
];

export function ShoppingCart() {
  const [items, setItems] = useState(initialItems);

  const valueTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-8 container mx-auto border border-background-light rounded-lg flex flex-col gap-4 w-[600px] h-[500px]">
      <div className="flex flex-col gap-4 flex-1 overflow-auto p-6 container-shopping-cart">
        {items.length > 0 ? (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <small className="italic">R$ {item.price}</small>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <p className="text-lg font-semibold">
                    R$ {item.quantity * item.price}
                  </p>
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
              </div>
            ))}
          </>
        ) : (
          <p className="text-lg font-semibold">Nenhum item no carrinho</p>
        )}
      </div>

      <div className="flex justify-between border-t border-background-light p-6">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold">R$ {valueTotal}</p>
      </div>
    </div>
  );
}
