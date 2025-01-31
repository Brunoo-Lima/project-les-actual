import { Modal } from '@/components/modal';
import { Select } from '@/components/ui/select/select';
import { selectStatus } from './../../../../../../mocks/select/select';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IStatusSchemaForm,
  StatusSchemaForm,
} from '@/components/validation/product-schema-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IProduct } from '@/@types/IProduct';

interface IModalStatusProps {
  onClose: () => void;
  product: Partial<IProduct> | null;
}

export function ModalStatus({ onClose, product }: IModalStatusProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IStatusSchemaForm>({
    resolver: yupResolver(StatusSchemaForm),
  });
  const handleSaveStatus: SubmitHandler<IStatusSchemaForm> = (data: {
    status: string;
  }) => {
    const updatedData = {
      status: data.status,
    };

    console.log('data', updatedData);
    toast.success('Status atualizado com sucesso!');
    onClose();
  };

  if (!product) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[400px] h-[250px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Status do produto" onClick={onClose} />

      <Modal.Content>
        <form
          onSubmit={handleSubmit(handleSaveStatus)}
          className="flex flex-col gap-4"
        >
          <Select
            label="Status"
            options={selectStatus}
            {...register('status')}
            error={errors.status}
          />

          <ButtonGeneral type="submit" text="Salvar" className="mt-4" />
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
