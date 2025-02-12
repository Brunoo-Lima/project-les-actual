"use client";

import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Input } from "@/components/ui/input/input";
import { SearchInput } from "@/components/ui/search/search";
import { SelectComponent } from "@/components/ui/select/select";
import { Slider } from "@/components/ui/slider";
import { useFilter } from "@/hooks/useFilter";
import { selectCategory, selectStatus } from "@/mocks/select/select";
import { FormatValue } from "@/utils/format-value";

interface IModalFilterProps {
  handleSubmit: () => void;
  onClose: () => void;
  clearFields: () => void;
}

export function ModalFilter({
  handleSubmit,
  onClose,
  clearFields,
}: IModalFilterProps) {
  const {
    searchName,
    setSearchName,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedPrice,
    setSelectedPrice,
    handleChangeCategory,
    handleChangeStatus,
    selectedStock,
    setSelectedStock,
  } = useFilter();

  const handleFilter = () => {
    handleSubmit();
    onClose();
  };

  const handleChange = (value: number[]) => {
    setSelectedPrice(value[0]);
  };

  return (
    <Modal.Root className="w-[400px] p-4 flex flex-col gap-y-4">
      <Modal.Header title="Filtrar produtos" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4">
        <SearchInput
          placeholder="Digite o nome do produto"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <Input
          label="Estoque"
          placeholder="Digite o estoque"
          value={String(selectedStock) || ""}
          onChange={(e) => setSelectedStock(Number(e.target.value))}
        />

        <SelectComponent
          options={selectCategory}
          label="Categoria"
          placeholder="Selecione uma categoria"
          onChange={handleChangeCategory}
        />

        <SelectComponent
          options={selectStatus}
          label="Status"
          placeholder="Selecione um status"
          onChange={handleChangeStatus}
        />

        <div className="flex flex-col gap-y-2">
          <label htmlFor="">Preço</label>
          <Slider
            onValueChange={handleChange}
            max={2000}
            className="bg-white"
            value={[selectedPrice || 0]}
          />

          <p className="text-base font-semibold">
            Valor: {FormatValue(selectedPrice || 0)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ButtonGeneral
            text="Filtrar"
            type="button"
            onClick={handleFilter}
            className="w-full"
          />
          <ButtonCancel
            text="Cancelar"
            onClick={clearFields}
            className="w-full"
          />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
