import { IProduct } from "@/@types/IProduct";
import { useCheckout } from "@/hooks/useCheckout";
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ICardProps {
  product: IProduct;
}

export function Card({ product }: ICardProps) {
  const { addProductToCart, cart } = useCheckout();

  const [quantity, setQuantity] = useState<number>(0);

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddProductToCart = () => {
    addProductToCart(product, quantity);
    toast.success("Produto adicionado ao carrinho!");
    setQuantity(1);
  };

  return (
    <div className="w-[300px] h-[480px] bg-background-dark shadow-md rounded-md">
      <div className="overflow-hidden h-[300px] w-full rounded-tl-md rounded-tr-md transition-all duration-500">
        <Image
          src={product.image}
          alt={`Action Figure ${product.name}`}
          className="object-contain rounded-tl-md rounded-tr-md transform transition-transform duration-500 ease-in-out hover:scale-110"
          width={300}
          height={200}
        />
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col gap-y-1 flex-1">
          <small className="text-sm italic bg-red-600 inline-block w-max px-2 py-0.5 rounded-md">
            {product.universe}
          </small>
          <p className="text-base font-thin">{product.name}</p>
          <p className="text-base font-semibold">R$ {product.price}</p>
          <p className="text-sm font-semibold">{product.description}</p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              className="bg-primary p-1 rounded-md flex items-center justify-center hover:bg-primary-dark transition duration-300"
            >
              <MinusIcon size={16} color="#000000" />
            </button>
            <p className="text-base font-semibold text-white">{quantity}</p>
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              className="bg-primary p-1 rounded-md flex items-center justify-center hover:bg-primary-dark transition duration-300"
            >
              <PlusIcon size={16} color="#000000" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddProductToCart}
            className="bg-primary p-1.5 w-96 rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-300"
          >
            <ShoppingBag size={16} color="#000000" />
            <p className="text-base font-semibold text-background-dark">
              Adicionar
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
