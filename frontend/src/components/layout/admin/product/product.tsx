"use client";

import { TitlePage } from "@/components/ui/title/title-page/title-page";
import { Table } from "./table/table";
import { PlusIcon } from "lucide-react";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { useEffect, useState } from "react";
import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { ModalRegister } from "./modals/modal-register/modal-register";
import { useData } from "@/hooks/useData";
import { IProduct } from "@/@types/IProduct";
import { ModalFilter } from "./modals/modal-filter/modal-filter";
import { useFilter } from "@/hooks/useFilter";
import { toast } from "sonner";
import { listProducts } from "@/services/product";

export function Product() {
  const {
    searchName,
    setSearchName,
    selectedStatus,
    selectedPrice,
    setSelectedStatus,
    setSelectedProfilePurchase,
    setSelectedPrice,
    selectedStock,
    setSelectedStock,
  } = useFilter();
  const { products, setProducts } = useData();

  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const [isOpenModalNewProduct, setIsOpenModalNewProduct] =
    useState<boolean>(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);

  const handleDeleteProduct = (id: number) => {
    setFilteredData((prevProducts) =>
      prevProducts.filter((product) => product.id !== id.toString())
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProducts();

        setProducts(response);
        setFilteredData(response);

        console.log("data", response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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
          !selectedStatus || client.isAvailable === true
            ? "Ativo"
            : "Inativo" === selectedStatus.value;

        const matchesPrice = !selectedPrice || client.price <= selectedPrice;

        const matchesStock =
          !selectedStock || client.stock.quantity <= +selectedStock;

        return matchesName && matchesStatus && matchesPrice && matchesStock;
      });

      setFilteredData(filtered);
    } catch (err) {
      toast.error("Erro ao buscar clientes");
    }
  };

  const clearFields = () => {
    setSearchName("");
    setSelectedStatus(null);
    setSelectedProfilePurchase(null);
    setSelectedPrice(null);
    setSelectedStock("");
    setIsOpenModalFilter(false);
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
