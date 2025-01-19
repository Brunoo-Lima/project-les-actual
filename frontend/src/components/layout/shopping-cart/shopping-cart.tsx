'use client';

import { useState } from 'react';
import { ButtonsQuantity } from './buttons-quantity/buttons-quantity';

export function ShoppingCart() {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mt-8 container mx-auto p-6 border border-background-light rounded-lg flex flex-col gap-4 w-[600px] h-[500px]">
      <div className="flex flex-col gap-4 flex-1 overflow-auto container-shopping-cart">
        <div className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Itachi Uchiha - Naruto </p>
            <p>Preço unitário: R$ 200,00</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">R$ {quantity * 200}</p>
            <ButtonsQuantity
              quantity={quantity}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Itachi Uchiha - Naruto </p>
            <p>Preço unitário: R$ 200,00</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">R$ {quantity * 200}</p>
            <ButtonsQuantity
              quantity={quantity}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Itachi Uchiha - Naruto </p>
            <p>Preço unitário: R$ 200,00</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">R$ {quantity * 200}</p>
            <ButtonsQuantity
              quantity={quantity}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Itachi Uchiha - Naruto </p>
            <p>Preço unitário: R$ 200,00</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">R$ {quantity * 200}</p>
            <ButtonsQuantity
              quantity={quantity}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Itachi Uchiha - Naruto </p>
            <p>Preço unitário: R$ 200,00</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">R$ {quantity * 200}</p>
            <ButtonsQuantity
              quantity={quantity}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between bg-background-light py-2 px-3 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Itachi Uchiha - Naruto </p>
            <p>Preço unitário: R$ 200,00</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">R$ {quantity * 200}</p>
            <ButtonsQuantity
              quantity={quantity}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold">R$ 200</p>
      </div>
    </div>
  );
}
