import { IProduct } from '@/@types/IProduct';
import { FormatValue } from '@/utils/format-value';
import Image from 'next/image';

interface ICardOrderProps {
  item: Partial<IProduct>;
}

export function CardOrder({ item }: ICardOrderProps) {
  return (
    <div className="flex gap-x-4 border-b border-b-gray-400 pb-4">
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
          <p>{FormatValue(item.price || 0)}</p>
        </div>

        <div className="flex flex-col items-end gap-y-2">
          <p className="bg-error-light font-semibold py-0.5 px-1 rounded-md">
            {item.category}
          </p>
          <p>Quantidade: {item.quantity}</p>
        </div>
      </div>
    </div>
  );
}
