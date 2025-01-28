import { Modal } from '@/components/modal';
import { Select } from '@/components/ui/select/select';
import { selectStatus } from './../../../../../../mocks/select/select';
import { ButtonGeneral } from '@/components/ui/button/button-general';

interface IModalStatusProps {
  onClose: () => void;
  product: any;
}

export function ModalStatus({ onClose, product }: IModalStatusProps) {
  const handleSaveStatus = () => {
    onClose();
  };

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[400px] h-[250px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Status do produto" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4">
        <Select label="Status" options={selectStatus} />

        <ButtonGeneral
          type="button"
          text="Salvar"
          onClick={handleSaveStatus}
          className="mt-4"
        />
      </Modal.Content>
    </Modal.Root>
  );
}
