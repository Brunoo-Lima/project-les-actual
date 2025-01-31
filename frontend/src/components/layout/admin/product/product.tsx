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
  const [products, setProducts] = useState(productListRegister);
  const [isOpenModalNewProduct, setIsOpenModalNewProduct] =
    useState<boolean>(false);

  const handleDeleteProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

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

      <Table data={products} onDeleteProduct={handleDeleteProduct} />

      {isOpenModalNewProduct && (
        <ModalBackground>
          <ModalRegister
            setProducts={setProducts}
            onClose={handleCloseModalNewProduct}
          />
        </ModalBackground>
      )}
    </section>
  );
}
