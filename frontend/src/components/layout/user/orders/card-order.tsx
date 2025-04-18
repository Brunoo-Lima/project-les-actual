"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IProduct } from "@/@types/IProduct";
import { FormatValue } from "@/utils/format-value";

interface ICardOrderProps {
  quantity: number;
  price: number;
  product: IProduct;
}

export function CardOrder({ quantity, product, price }: ICardOrderProps) {
  const [previewImage, setPreviewImage] = useState<string>("/img/luffy.webp");

  useEffect(() => {
    if (product.image instanceof File) {
      const objectUrl = URL.createObjectURL(product.image);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof product.image === "string") {
      setPreviewImage(product.image);
    }
  }, [product.image]);

  if (!product) return null;

  return (
    <div className="flex gap-x-4 border-b border-b-gray-400 pb-4">
      <div className="size-16 flex items-center justify-center">
        {previewImage && (
          <Image
            src={previewImage}
            width={64}
            height={64}
            alt={product.name || "Imagem do produto"}
            className="size-16 object-contain"
            priority
          />
        )}
      </div>
      <div className="grid grid-cols-2 flex-1 gap-4">
        <div className="flex-1 flex flex-col gap-y-2">
          <p>{product.name}</p>
          <p>{FormatValue(price || 0)}</p>
        </div>

        <div className="flex flex-col items-end gap-y-2">
          <p className="bg-error-light font-semibold py-0.5 px-1 rounded-md">
            {product.universe}
          </p>
          <p>Quantidade: {quantity}</p>
        </div>
      </div>
    </div>
  );
}
