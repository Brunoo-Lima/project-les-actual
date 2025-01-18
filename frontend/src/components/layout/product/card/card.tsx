import Image from 'next/image';

interface ICardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    anime: string;
    category: string;
  };
}

export function Card({ product }: ICardProps) {
  return (
    <div className="w-[300px] h-[450px] bg-background-light shadow-md rounded-md">
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
        <div className="flex flex-col flex-1">
          <h2>{product.anime}</h2>
          <h3>{product.name}</h3>
          <p>R$ {product.price}</p>
        </div>

        <button type="button" className="bg-primary-dark text-background">
          + Carrinho
        </button>
      </div>
    </div>
  );
}
