/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/@types/IProduct';
import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { FormatValue } from '@/utils/format-value';

interface IModalInfoProps {
  onClose: () => void;
  product: IProduct | null;
}

export function ModalInfo({ onClose, product }: IModalInfoProps) {
  if (!product) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[400px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Informações do produto" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-4 *:text-textColor-dark *:text-base *:font-normal">
            <p>Nome: {product.name}</p>
            <p>Anime: {product.anime}</p>
            <p>Preço: {FormatValue(product.price)}</p>
            <p>Estoque: {product.stock}</p>
            <p>Status: {product.status}</p>
          </div>

          <div className="w-[200px] h-auto mr-4">
            <img src="/img/naruto.webp" alt="" />
          </div>
        </div>

        <ButtonCancel onClick={onClose} text="Fechar" className="mt-4" />
      </Modal.Content>
    </Modal.Root>
  );
}
