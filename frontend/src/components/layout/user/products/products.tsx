"use client";

import { SearchInput } from "@/components/ui/search/search";
import { Card } from "./card/card";
import { useData } from "@/hooks/useData";
import { useFilter } from "@/hooks/useFilter";
import { IProduct } from "@/@types/IProduct";
import { ChangeEvent, useState } from "react";
import { TitlePage } from "@/components/ui/title/title-page/title-page";
import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { ModalLogs } from "./modal-logs";

export function Products() {
  const { products } = useData();
  const [isOpenModalLog, setIsOpenModalLog] = useState<boolean>(false);
  const { searchName, setSearchName } = useFilter();
  const [filteredData, setFilteredData] = useState<IProduct[]>(products);

  const handleSearchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);

    setFilteredData((prev) =>
      prev.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleClearFilter = () => {
    setSearchName("");
    setFilteredData(products);
  };

  const handleOpenModalLog = () => {
    setIsOpenModalLog(true);
  };

  return (
    <section className="container mx-auto py-10 min-h-screen">
      <article className="flex items-center justify-between h-max">
        <TitlePage title="Produtos" />

        <div className="flex items-center gap-4">
          <SearchInput
            value={searchName}
            onChange={handleSearchProducts}
            onClear={handleClearFilter}
            placeholder="Buscar produtos..."
            className="w-80"
          />

          <p
            className="underline text-sm cursor-pointer"
            onClick={handleOpenModalLog}
          >
            Consultas realizadas
          </p>
        </div>
      </article>

      <div className="flex flex-wrap gap-4 justify-center pt-9">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p className="text-2xl text-white">Nenhum produto encontrado.</p>
        )}
      </div>

      {isOpenModalLog && (
        <ModalBackground>
          <ModalLogs onClose={() => setIsOpenModalLog(false)} />
        </ModalBackground>
      )}
    </section>
  );
}
