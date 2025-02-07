import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { Input } from '@/components/ui/input/input';
import { SelectComponent } from '@/components/ui/select/select';
import { Slider } from '@/components/ui/slider';
import { useFilter } from '@/hooks/useFilter';
import { selectCategory, selectStatus } from '@/mocks/select/select';

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
        <Input
          label="Nome do produto"
          placeholder="Digite o nome do produto"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
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

        {/* Ver dps qual o problema */}
        {/* <div>
          <label htmlFor="">Preço</label>
          <Slider onValueChange={handleChange} />

          <p>Valor: {selectedPrice}</p>
        </div> */}

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
