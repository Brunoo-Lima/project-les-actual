import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { Input } from '@/components/ui/input/input';
import {
  addressEmpty,
  AddressSchemaForm,
  IAddressSchemaForm,
} from '@/components/validation/address-schema.form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IAddressFormProps {
  onClose: () => void;
}

export function AddressForm({ onClose }: IAddressFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IAddressSchemaForm>({
    resolver: yupResolver(AddressSchemaForm),
  });

  const onSubmit: SubmitHandler<IAddressSchemaForm> = (data) => {
    console.log('endereço', data);
  };

  return (
    <Modal.Root className="w-[600px] h-[550px] overflow-auto p-4">
      <Modal.Header title="Cadastrar endereço" onClick={onClose} />

      <div
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-2"
      >
        <div>
          <Input
            label="Nome de Identificação"
            placeholder="Digite o nome de identificação"
            {...register('identifier')}
            error={errors.identifier}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="CEP" placeholder="Digite o CEP" />
          <Input label="Nome da rua" placeholder="Digite o nome da rua" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Número" placeholder="Digite o número" />
          <Input label="Bairro" placeholder="Digite o bairro" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Tipo de residência" placeholder="Digite a residência" />
          <Input label="Tipo de logradouro" placeholder="Digite o logradouro" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Cidade" placeholder="Digite a cidade" />
          <Input label="Estado" placeholder="Digite o estado" />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            type="submit"
            className="bg-primary text-background p-2 rounded-md font-semibold text-base w-60 transition duration-300 hover:bg-primary-dark"
          >
            Salvar
          </button>
          <ButtonCancel text="Limpar campos" onClick={() => addressEmpty} />
        </div>
      </div>
    </Modal.Root>
  );
}
