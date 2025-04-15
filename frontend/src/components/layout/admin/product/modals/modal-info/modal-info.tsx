"use client";

/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/@types/IProduct";
import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { FormatValue } from "@/utils/format-value";
import { useState } from "react";

interface IModalInfoProps {
  onClose: () => void;
  product: IProduct | null;
}

export function ModalInfo({ onClose, product }: IModalInfoProps) {
  const [imageError, setImageError] = useState(false);

  if (!product) return;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[400px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Informações do produto" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-4 *:text-textColor-dark *:text-base *:font-normal">
            <p>Nome: {product.name}</p>
            <p>Descrição: {product.description || "Sem descrição"}</p>
            <p>Preço: {FormatValue(product.price)}</p>
            <p>Estoque: {product.stock.quantity}</p>
            <p>Marca: {product.brand}</p>
            <p>Material: {product.material}</p>
            <p>Universe: {product.universe}</p>
            <p>Peso: {product.weight}</p>
            <p>Largura: {product.width}</p>
            <p>Altura: {product.height}</p>
            <p>Profundidade: {product.depth}</p>
            <p>Status: {product.isAvailable ? "Ativo" : "Inativo"}</p>
            <p>Categoria de disponibilidade: {product.categoryIsAvailable}</p>
            {product.inactiveReason && (
              <p>Justificativa: {product.inactiveReason}</p>
            )}
          </div>

          <div className="w-[200px] h-auto mr-4">
            {product.image && !imageError && (
              <div className="w-[200px] h-[200px] flex-shrink-0 mr-4">
                <img
                  src={product.image as any}
                  alt={`Imagem do produto ${product.name}`}
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              </div>
            )}
          </div>
        </div>

        <ButtonCancel onClick={onClose} text="Fechar" className="mt-4" />
      </Modal.Content>
    </Modal.Root>
  );
}
