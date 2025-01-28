'use client';

import { TitlePage } from '@/components/ui/title/title-page/title-page';
import { Table } from './table/table';
import { productListRegister } from '@/mocks/product-list-register';
import { PlusIcon } from 'lucide-react';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { useState } from 'react';
import { ModalBackground } from '@/components/modal/modal-background/modal-background';
import { ModalRegister } from './modals/modal-register/modal-register';

export function Product() {
  const [isOpenModalNewProduct, setIsOpenModalNewProduct] =
    useState<boolean>(false);

  const handleOpenModalNewProduct = () => {
    setIsOpenModalNewProduct(true);
  };

  const handleCloseModalNewProduct = () => {
    setIsOpenModalNewProduct(false);
  };

  return (
    <section className="flex flex-col gap-y-4">
      <TitlePage title="Lista de produto" />

      <ButtonGeneral
        className="self-end"
        icon={<PlusIcon size={16} color="#000000" />}
        text="Cadastrar novo produto"
        onClick={handleOpenModalNewProduct}
      />

      <Table data={productListRegister} />

      {isOpenModalNewProduct && (
        <ModalBackground>
          <ModalRegister onClose={handleCloseModalNewProduct} />
        </ModalBackground>
      )}
    </section>
  );
}
