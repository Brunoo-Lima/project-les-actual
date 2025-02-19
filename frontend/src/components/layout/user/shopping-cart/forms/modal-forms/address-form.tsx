import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { SelectComponent } from "@/components/ui/select/select";
import { Textarea } from "@/components/ui/textarea/textarea";
import {
  addressEmpty,
  AddressSchemaForm,
  IAddressSchemaForm,
} from "@/components/validation/address-schema-form";
import { useCheckout } from "@/hooks/useCheckout";
import {
  selectTypePublicPlace,
  selectTypeResidence,
} from "@/mocks/select/select";
import { getCep } from "@/services/cep";
import { yupResolver } from "@hookform/resolvers/yup";
import { FocusEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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
    setValue,
    control,
  } = useForm<IAddressSchemaForm>({
    resolver: yupResolver(AddressSchemaForm),
  });

  const delivery = watch("delivery");

  const handleAddCep = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/[^0-9]/g, "");

    try {
      const data = await getCep(cep);

      if (data) {
        setValue(`zipCode`, data.cep);
        setValue(`street`, data.logradouro);
        setValue(`city`, data.localidade);
        setValue(`state`, data.uf);
        setValue("publicPlace", data.complemento);
        setValue(`neighborhood`, data.bairro);
      }
    } catch (error) {
      toast.warning("CEP inválido");
    }
  };

  const onSubmit: SubmitHandler<IAddressSchemaForm> = (data) => {
    console.log("endereço", data);

    const updatedData = {
      id: Math.random() * 100,
      ...data,
    };

    handleAddAddressOnOrder(updatedData);
    onClose();

    toast.success("Endereço cadastrado!");
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
            {...register("identifier")}
            error={errors.identifier}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="CEP"
            placeholder="Digite o CEP"
            {...register("zipCode", {
              onBlur: (e) => handleAddCep(e),
            })}
            error={errors.zipCode}
          />
          <Input
            label="Nome da rua"
            placeholder="Digite o nome da rua"
            {...register("street")}
            error={errors.street}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Número"
            placeholder="Digite o número"
            {...register("number")}
            error={errors.number}
          />
          <Input
            label="Bairro"
            placeholder="Digite o bairro"
            {...register("neighborhood")}
            error={errors.neighborhood}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="typeResidence"
            control={control}
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Tipo de residência"
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error}
                name={field.name}
                ref={field.ref}
                placeholder="Selecione um tipo de residência"
                options={selectTypeResidence}
              />
            )}
          />

          <Controller
            name="typePublicPlace"
            control={control}
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Tipo de logradouro"
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error}
                name={field.name}
                ref={field.ref}
                placeholder="Selecione um tipo de logradouro"
                options={selectTypePublicPlace}
              />
            )}
          />

          <Input
            label="Logradouro"
            placeholder="Digite o logradouro"
            {...register("publicPlace")}
            error={errors.publicPlace}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Cidade"
            placeholder="Digite a cidade"
            {...register("city")}
            error={errors.city}
          />
          <Input
            label="Estado"
            placeholder="Digite o estado"
            {...register("state")}
            error={errors.state}
          />
          <Input
            label="País"
            placeholder="Digite o país"
            {...register("country")}
            error={errors.country}
          />
        </div>

        <Textarea
          label="Observação"
          placeholder="Digite a observação"
          {...register("observation")}
          error={errors.observation}
        />

        <div className="flex gap-4">
          <Checkbox label="Cobrança" {...register("charge")} />
          <Checkbox label="Entrega" {...register("delivery")} />
        </div>

        <div>
          {delivery && (
            <Input
              label="Identificador de entrega"
              placeholder="Digite o identificador de entrega"
              {...register("identifierDelivery")}
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
