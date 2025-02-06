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
import { useCheckout } from '@/hooks/useCheckout';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface IAddressFormProps {
  onClose: () => void;
}

export function AddressForm({ onClose }: IAddressFormProps) {
  const { handleAddAddressOnOrder } = useCheckout();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IAddressSchemaForm>({
    resolver: yupResolver(AddressSchemaForm),
  });

  const delivery = watch('delivery');

  const onSubmit: SubmitHandler<IAddressSchemaForm> = (data) => {
    console.log('endereço', data);

    const updatedData = {
      id: Math.random() * 100,
      ...data,
    };

    handleAddAddressOnOrder(updatedData);
    onClose();

    toast.success('Endereço cadastrado!');
  };

  return (
    <Modal.Root className="w-[600px] h-[550px] overflow-auto p-4">
      <Modal.Header title="Cadastrar endereço" onClick={onClose} />

      <form
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
          <Input
            label="CEP"
            placeholder="Digite o CEP"
            {...register('zipCode')}
            error={errors.zipCode}
          />
          <Input
            label="Nome da rua"
            placeholder="Digite o nome da rua"
            {...register('street')}
            error={errors.street}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Número"
            placeholder="Digite o número"
            {...register('number')}
            error={errors.number}
          />
          <Input
            label="Bairro"
            placeholder="Digite o bairro"
            {...register('neighborhood')}
            error={errors.neighborhood}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Tipo de residência"
            placeholder="Digite a residência"
            {...register('typeResidence')}
            error={errors.typeResidence}
          />
          <Input
            label="Logradouro"
            placeholder="Digite o logradouro"
            {...register('publicPlace')}
            error={errors.publicPlace}
          />
          <Input
            label="Tipo de logradouro"
            placeholder="Digite o logradouro"
            {...register('typePublicPlace')}
            error={errors.typePublicPlace}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Cidade"
            placeholder="Digite a cidade"
            {...register('city')}
            error={errors.city}
          />
          <Input
            label="Estado"
            placeholder="Digite o estado"
            {...register('state')}
            error={errors.state}
          />
          <Input
            label="País"
            placeholder="Digite o país"
            {...register('country')}
            error={errors.country}
          />
        </div>

        <Textarea
          label="Observação"
          placeholder="Digite a observação"
          {...register('observation')}
          error={errors.observation}
        />

        <div className="flex gap-4">
          <Checkbox label="Cobrança" {...register('charge')} />
          <Checkbox label="Entrega" {...register('delivery')} />
        </div>

        <div>
          {delivery && (
            <Input
              label="Identificador de entrega"
              placeholder="Digite o identificador de entrega"
              {...register('identifierDelivery')}
              error={errors.identifierDelivery}
            />
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <ButtonGeneral type="submit" text="Salvar" className="w-60" />
          <ButtonCancel text="Limpar campos" onClick={() => addressEmpty} />
        </div>
      </form>
    </Modal.Root>
  );
}
