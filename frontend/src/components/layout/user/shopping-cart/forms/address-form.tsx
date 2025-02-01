import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { Input } from '@/components/ui/input/input';
import { Textarea } from '@/components/ui/textarea/textarea';
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

        <div className="grid grid-cols-3 gap-4">
          <Input label="Cidade" placeholder="Digite a cidade" />
          <Input label="Estado" placeholder="Digite o estado" />
          <Input label="País" placeholder="Digite o país" />
        </div>

        <Textarea label="Observação" placeholder="Digite a observação" />

        <div className="flex gap-4">
          <Checkbox label="Cobrança" />
          <Checkbox label="Entrega" />
        </div>

        {/* Fazer uma condicional para se entrega for true, o input de identificador de delivery aparecer */}

        <div className="flex justify-center gap-4 mt-8">
          <ButtonGeneral type="submit" text="Salvar" className=" w-60" />
          <ButtonCancel text="Limpar campos" onClick={() => addressEmpty} />
        </div>
      </div>
    </Modal.Root>
  );
}
