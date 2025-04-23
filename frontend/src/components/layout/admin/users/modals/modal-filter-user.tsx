import { IUser } from "@/@types/IUser";
import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Input } from "@/components/ui/input/input";
import { SearchInput } from "@/components/ui/search/search";
import { SelectComponent } from "@/components/ui/select/select";
import { useFilter } from "@/hooks/useFilter";
import { selectStatus } from "@/mocks/select/select";
import { formatDate } from "@/utils/format-date";
import dayjs from "dayjs";

interface IModalFilterUserProps {
  onClose: () => void;
  onClearFields: () => void;
  onApplyFilters: () => void;
}

export function ModalFilterUser({
  onClose,
  onClearFields,
  onApplyFilters,
}: IModalFilterUserProps) {
  const {
    searchName,
    setSearchName,
    handleChangeStatus,
    selectedDateRegister,
    setSelectedDateRegister,
  } = useFilter();

  const handleSubmit = () => {
    onApplyFilters();
    onClose();
  };

  // const handleFormatDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const formattedDate = dayjs(e.target.value).format("DD/MM/YYYY");
  //   setSelectedDateRegister(formattedDate);
  // };

  return (
    <Modal.Root className="w-[400px] p-4 flex flex-col gap-y-4">
      <Modal.Header title="Filtros" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4">
        <SearchInput
          placeholder="Digite o nome do usuário"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        {/* <Input
          label="Data de cadastro"
          type="date"
          value={selectedDateRegister || ""}
          onChange={handleFormatDate}
        /> */}

        <SelectComponent
          label="Status"
          placeholder="Selecione o status"
          options={selectStatus}
          onChange={handleChangeStatus}
        />

        <div className="grid grid-cols-2 gap-2">
          <ButtonGeneral
            text="Filtrar"
            className="w-full"
            onClick={handleSubmit}
          />
          <ButtonCancel
            text="Cancelar"
            className="w-full"
            onClick={onClearFields}
          />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
