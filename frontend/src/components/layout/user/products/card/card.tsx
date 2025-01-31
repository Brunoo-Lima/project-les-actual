import { IProduct } from '@/@types/IProduct';
import { useData } from '@/hooks/useData';
import { ShoppingCart } from '@phosphor-icons/react';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface ICardProps {
  product: IProduct;
}

export function Card({ product }: ICardProps) {
  const { cartItems, setCartItems } = useData();

  const handleAddProductCart = () => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="w-[300px] h-[480px] bg-background-light shadow-md rounded-md">
      <div className="overflow-hidden h-[300px] w-full rounded-tl-md rounded-tr-md transition-all duration-500">
        <Image
          src={product.image}
          alt={`Action Figure ${product.anime}`}
          className="object-contain rounded-tl-md rounded-tr-md transform transition-transform duration-500 ease-in-out hover:scale-110"
          width={300}
          height={200}
        />
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col gap-y-1 flex-1">
          <small className="text-sm italic bg-red-600 inline-block w-max px-2 py-0.5 rounded-md">
            {product.anime}
          </small>
          <p className="text-base font-thin">{product.name}</p>
          <p className="text-base font-semibold">R$ {product.price}</p>
        </div>

        <button
          type="button"
          onClick={handleAddProductCart}
          className="bg-primary p-1 mt-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300"
        >
          <ShoppingBag size={16} color="#000000" />
          <p className="text-base font-semibold text-background-dark">
            Carrinho
          </p>
        </button>
      </div>
    </div>
  );
}
