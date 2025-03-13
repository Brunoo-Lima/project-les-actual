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
import { FocusEvent, useEffect } from "react";
import {
  Control,
  Controller,
  FieldError,
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";
import { SectionType } from "../edit-user/edit-user";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Textarea } from "@/components/ui/textarea/textarea";
import { IUser } from "@/@types/IUser";

interface IAddressFormUserEditProps {
  addresses: IUser["addresses"];
  editSection: SectionType;
  startEditingSection: (section: SectionType) => void;
  stopEditingSection: () => void;
}

export function AddressFormUserEdit({
  addresses,
  editSection,
  startEditingSection,
  stopEditingSection,
}: IAddressFormUserEditProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  useEffect(() => {
    if (addresses) {
      setValue("addresses", addresses);
    }
  }, [addresses, setValue]);

  const onSubmit = (data: any) => {
    // Lógica para salvar telefones
    console.log(data.addresses);
    toast.success("Endereços salvos com sucesso!");
    stopEditingSection();
  };

  // const handleAddCep = async (
  //   e: FocusEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const cep = e.target.value.replace(/[^0-9]/g, "");

  //   try {
  //     const data = await getCep(cep);

  //     if (data) {
  //       setValue(`addresses.${index}.zipCode`, data.cep);
  //       setValue(`addresses.${index}.street`, data.logradouro);
  //       setValue(`addresses.${index}.city`, data.localidade);
  //       setValue(`addresses.${index}.state`, data.uf);
  //       setValue(`addresses.${index}.neighborhood`, data.bairro);
  //     }
  //   } catch (error) {
  //     toast.warning("CEP inválido");
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-primary-dark">
            Endereço {index + 1}
          </h3>

          <div className="flex gap-4">
            <Input
              label="CEP"
              placeholder="Digite o cep"
              {...register(`addresses.${index}.zipCode`, {
                // onChange: (e) => handleAddCep(e, index),
              })}
              error={errors.zipCode as FieldError}
              // disabled={editSection !== section}
            />
            <Input
              label="Rua"
              placeholder="Digite a rua"
              {...register(`addresses.${index}.street`)}
              error={errors.street as FieldError}
              // disabled={editSection !== section}
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
                  // disabled={editSection !== section}
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
                  // disabled={editSection !== section}
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
              error={errors.neighborhood as FieldError}
              // disabled={editSection !== section}
            />
            <Input
              label="Número"
              placeholder="Digite o número"
              {...register(`addresses.${index}.number`)}
              error={errors.number as FieldError}
              // disabled={editSection !== section}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Cidade"
              placeholder="Digite o cidade"
              {...register(`addresses.${index}.city`)}
              error={errors.city as FieldError}
              // disabled={editSection !== section}
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
                  // disabled={editSection !== section}
                  error={fieldState.error}
                />
              )}
            />

            <Input
              label="País"
              placeholder="Digite o país"
              {...register(`addresses.${index}.country`)}
              error={errors.country as FieldError}
              // disabled={editSection !== section}
            />
          </div>

          <div className="flex gap-4">
            <Checkbox
              label="Entrega"
              {...register(`addresses.${index}.delivery`)}
              error={errors.delivery as FieldError}
              // disabled={editSection !== section}
            />
            <Checkbox
              label="Cobrança"
              {...register(`addresses.${index}.charge`)}
              error={errors.charge as FieldError}
              // disabled={editSection !== section}
            />
          </div>

          <Input
            label="Nome endereço de entrega"
            className="w-52"
            placeholder="Digite o nome"
            {...register(`addresses.${index}.identifierDelivery`)}
            error={errors.identifierDelivery as FieldError}
            // disabled={editSection !== section}
          />

          <Textarea
            label="Observação"
            placeholder="Digite a observação"
            {...register(`addresses.${index}.observation`)}
          />

          <div>
            <ButtonCancel
              text="Remover endereço"
              onClick={() => remove(index)}
            />
            <button>Editar</button>
            <button>Adicionar</button>
          </div>
        </div>
      ))}
    </form>
  );
}
