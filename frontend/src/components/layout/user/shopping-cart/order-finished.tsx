'use client';

import { ModalBackground } from '@/components/modal/modal-background/modal-background';
import { useCheckout } from '@/hooks/useCheckout';
import { FormatValue } from '@/utils/format-value';
import { useState } from 'react';
import ModalDetailsOrder from './modal-details-order';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Image from 'next/image';

export function OrderFinished() {
  const { order } = useCheckout();
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  if (!order) return;

  return (
    <section className="flex items-center flex-col gap-y-4 py-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Pedido Concluído!</h1>

      <div className="grid grid-cols-[1fr_200px] place-items-center gap-6 bg-background-light rounded-md p-4 w-[650px] h-max">
        <div className="flex flex-col gap-y-4 w-full">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-x-4 border-b border-b-gray-400 pb-4"
            >
              <div className="size-16 flex items-center justify-center">
                <Image
                  src={item.image}
                  width={64}
                  height={64}
                  alt=""
                  className="size-16 object-contain"
                />
              </div>
              <div className="grid grid-cols-2 flex-1 gap-4">
                <div className="flex-1 flex flex-col gap-y-2">
                  <p>{item.name}</p>
                  <p>{FormatValue(item.price)}</p>
                </div>

                <div className="flex flex-col items-end gap-y-2">
                  <p className="bg-error-light font-semibold py-0.5 px-1 rounded-md">
                    {item.category}
                  </p>
                  <p>Quantidade: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col relative h-full">
          <div
            className="flex items-center gap-2 cursor-pointer transition duration-300 *:hover:text-primary-light relative"
            onClick={() => setIsOpenDetails(true)}
          >
            <p className="">Ver detalhes do pedido</p>
            {isOpenDetails === true ? (
              <ChevronUpIcon
                size={20}
                onClick={() => setIsOpenDetails(false)}
              />
            ) : (
              <ChevronDownIcon
                size={20}
                onClick={() => setIsOpenDetails(true)}
              />
            )}
          </div>

          <div className="absolute bottom-0 left-0">
            <p>Total do pedido:</p>
            <span className="font-bold text-xl">
              {FormatValue(order.total)}
            </span>
          </div>
        </div>
      </div>

      {isOpenDetails && (
        <ModalBackground>
          <ModalDetailsOrder
            order={order}
            onClose={() => setIsOpenDetails(false)}
          />
        </ModalBackground>
      )}
    </section>
  );
}
