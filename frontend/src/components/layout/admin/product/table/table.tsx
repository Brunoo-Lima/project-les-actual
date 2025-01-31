'use client';

import { JSX, useState } from 'react';
import { TableRow } from './table-row';
import { ModalBackground } from '@/components/modal/modal-background/modal-background';
import { ModalStatus } from '../modals/modal-status/modal-status';
import { ModalInfo } from '../modals/modal-info/modal-info';
import { IProduct } from '@/@types/IProduct';
import { toast } from 'sonner';
import { ModalEdit } from '../modals/modal-edit/modal-edit';

interface ITableProps {
  data: IProduct[];
  onDeleteProduct: (product: number) => void;
}

type ModalType = 'status' | 'edit' | 'info' | null;

export function Table({ data, onDeleteProduct }: ITableProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleDeleteProduct = (
    product: IProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onDeleteProduct(product.id);
    toast.success('Produto deletado com sucesso!');
  };

  const handleOpenModalEditStatusProduct = (
    product: IProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setModalType('status');
  };

  const handleOpenModalInfoProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setModalType('info');
  };

  const handleOpenModalEditProduct = (
    product: IProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setModalType('edit');
  };

  const modalComponent: Record<Exclude<ModalType, null>, JSX.Element> = {
    status: (
      <ModalStatus
        product={selectedProduct}
        onClose={() => setModalType(null)}
      />
    ),
    info: (
      <ModalInfo product={selectedProduct} onClose={() => setModalType(null)} />
    ),

    edit: (
      <ModalEdit
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        onClose={() => setModalType(null)}
      />
    ),
  };

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <table className="table-fixed w-full border-separate border-spacing-y-5">
          <thead className="text-left p-2">
            <tr>
              <th className="w-1/6 pl-2">Id</th>
              <th className="w-1/5">Nome do produto</th>
              <th className="w-1/5">Valor</th>
              <th className="w-1/5">Status</th>
              <th className="w-1/5">Estoque</th>
              <th className="w-1/12 pl-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                onOpenDetailsProduct={handleOpenModalInfoProduct}
                onEditStatusProduct={handleOpenModalEditStatusProduct}
                onEditProduct={handleOpenModalEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-primary-light text-base font-normal mt-6">
          Não há produto
        </p>
      )}

      {modalType && (
        <ModalBackground>{modalComponent[modalType]}</ModalBackground>
      )}
    </div>
  );
}
