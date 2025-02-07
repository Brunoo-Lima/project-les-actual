'use client';

import { TitlePage } from '@/components/ui/title/title-page/title-page';
import { Table } from './table/table';
import { productListRegister } from '@/mocks/product-list-register';
import { PlusIcon } from 'lucide-react';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { useState } from 'react';
import { ModalBackground } from '@/components/modal/modal-background/modal-background';
import { ModalRegister } from './modals/modal-register/modal-register';
import { useData } from '@/hooks/useData';
import { IProduct } from '@/@types/IProduct';
import { ModalFilter } from './modals/modal-filter/modal-filter';
import { useFilter } from '@/hooks/useFilter';

export function Product() {
  const {
    isSearching,
    setIsSearching,
    searchName,
    setSearchName,
    selectedStatus,
    setSelectedStatus,
    selectedProfilePurchase,
    setSelectedProfilePurchase,
    selectedCategory,
    setSelectedCategory,
  } = useFilter();
  const { products, setProducts } = useData();

  const [filteredData, setFilteredData] = useState<IProduct[]>(products);
  const [isOpenModalNewProduct, setIsOpenModalNewProduct] =
    useState<boolean>(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);

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
  const applyFilters = async () => {
    try {
      // const clientsData = await findClients();

      const filtered = products.filter((client) => {
        const matchesName = client.name
          .toLowerCase()
          .includes(searchName.toLowerCase());

        const matchesStatus =
          !selectedStatus || client.status === selectedStatus.value;

        const matchesProfilePurchase =
          !selectedProfilePurchase ||
          client.category === selectedCategory?.value;

        return matchesName && matchesStatus && matchesProfilePurchase;
      });

      setFilteredData(filtered);
    } catch (err) {
      // handleError(err);
    }
  };

  const clearFields = () => {
    setSearchName('');
    setSelectedStatus(null);
    setSelectedProfilePurchase(null);
    setSelectedCategory(null);
  };

  return (
    <section className="flex flex-col gap-y-4">
      <TitlePage title="Lista de produto" />

      <article className="flex justify-between">
        <ButtonGeneral
          text="Filtros"
          onClick={() => setIsOpenModalFilter(true)}
          className="bg-blue-800 text-background-dark w-40 hover:bg-blue-500 "
        />

        <ButtonGeneral
          className="self-end"
          icon={<PlusIcon size={16} color="#000000" />}
          text="Cadastrar novo produto"
          onClick={handleOpenModalNewProduct}
        />
      </article>

      <Table data={filteredData} onDeleteProduct={handleDeleteProduct} />

      {isOpenModalNewProduct && (
        <ModalBackground>
          <ModalRegister
            setProducts={setProducts}
            onClose={handleCloseModalNewProduct}
          />
        </ModalBackground>
      )}

      {isOpenModalFilter && (
        <ModalBackground>
          <ModalFilter
            onClose={() => setIsOpenModalFilter(false)}
            handleSubmit={applyFilters}
            clearFields={clearFields}
          />
        </ModalBackground>
      )}
    </section>
  );
}
