import { IAddress } from "@/@types/IAddress";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Input } from "@/components/ui/input/input";
import { SelectComponent } from "@/components/ui/select/select";
import { IClientSchemaForm } from "@/components/validation/client-schema-form";
import {
  selectStates,
  selectTypePublicPlace,
  selectTypeResidence,
} from "@/mocks/select/select";
import { getCep } from "@/services/cep";
import { FocusEvent } from "react";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";

interface IAddressFormUserProps {
  register: UseFormRegister<IClientSchemaForm>;
  errors: Partial<Record<keyof IAddress, FieldError>>;
  control: Control<IClientSchemaForm>;
  index: number;
  removeAddress: () => void;
  setValue: UseFormSetValue<IClientSchemaForm>;
}

export function AddressFormUser({
  register,
  errors,
  control,
  index,
  removeAddress,
  setValue,
}: IAddressFormUserProps) {
  const handleAddCep = async (
    e: FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const cep = e.target.value.replace(/[^0-9]/g, "");

    try {
      const data = await getCep(cep);

      if (data) {
        setValue(`addresses.${index}.zipCode`, data.cep);
        setValue(`addresses.${index}.street`, data.logradouro);
        setValue(`addresses.${index}.city`, data.localidade);
        setValue(`addresses.${index}.state`, data.uf);
        setValue(`addresses.${index}.neighborhood`, data.bairro);
      }
    } catch (error) {
      toast.warning("CEP inválido");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4">
      <h3 className="text-xl font-semibold text-primary-dark">
        Endereço {index + 1}
      </h3>

      <div className="flex gap-4">
        <Input
          label="CEP"
          placeholder="Digite o cep"
          {...register(`addresses.${index}.zipCode`, {
            onChange: (e) => handleAddCep(e, index),
          })}
          error={errors.zipCode}
        />
        <Input
          label="Rua"
          placeholder="Digite a rua"
          {...register(`addresses.${index}.street`)}
          error={errors.street}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name={`addresses.${index}.typePublicPlace`}
          render={({ field, fieldState }) => (
            <SelectComponent
              label="Tipo Logradouro"
              placeholder="Selecione o tipo"
              options={selectTypePublicPlace}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              error={fieldState.error}
            />
          )}
        />

        <Controller
          control={control}
          name={`addresses.${index}.typeResidence`}
          render={({ field, fieldState }) => (
            <SelectComponent
              label="Tipo residência"
              placeholder="Selecione o tipo"
              options={selectTypeResidence}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              error={fieldState.error}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bairro"
          placeholder="Digite o bairro"
          {...register(`addresses.${index}.neighborhood`)}
          error={errors.neighborhood}
        />
        <Input
          label="Número"
          placeholder="Digite o número"
          {...register(`addresses.${index}.number`)}
          error={errors.number}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Cidade"
          placeholder="Digite o cidade"
          {...register(`addresses.${index}.city`)}
          error={errors.city}
        />
        <Controller
          control={control}
          name={`addresses.${index}.state`}
          render={({ field, fieldState }) => (
            <SelectComponent
              label="Estado"
              placeholder="Selecione o estado"
              options={selectStates}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              error={fieldState.error}
            />
          )}
        />

        <Input
          label="País"
          placeholder="Digite o país"
          {...register(`addresses.${index}.country`)}
          error={errors.country}
        />
      </div>

      <div>
        <ButtonCancel text="Remover endereço" onClick={removeAddress} />
      </div>
    </div>
  );
}
