import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { SelectComponent } from "@/components/ui/select/select";
import { selectFlagCard } from "@/mocks/select/select";
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { SectionType } from "./edit-user";
import { IUser } from "@/@types/IUser";
import { useEffect } from "react";
import { toast } from "sonner";

interface ICreditCardFormUserEditProps {
  creditCards: IUser["creditCards"];
  editSection: SectionType;
  startEditingSection: (section: SectionType) => void;
  stopEditingSection: () => void;
}

export function CreditCardFormUserEdit({
  creditCards,
  editSection,
  startEditingSection,
  stopEditingSection,
}: ICreditCardFormUserEditProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "creditCards",
  });

  useEffect(() => {
    if (creditCards) {
      setValue("creditCards", creditCards);
    }
  }, [creditCards, setValue]);

  const onSubmit = (data: any) => {
    // Lógica para salvar telefones
    console.log(data.addresses);
    toast.success("Cartões de crédito salvos com sucesso!");
    stopEditingSection();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4"
    >
      {fields.map((field, index) => (
        <div className="flex flex-col gap-2" key={field.id}>
          <h3 className="text-xl font-semibold text-primary-dark">
            Cartão de crédito {index + 1}
          </h3>

          <Controller
            control={control}
            name={`creditCards.${index}.flag`}
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Bandeira"
                placeholder="Selecione a bandeira"
                options={selectFlagCard}
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
            label="Número do cartão"
            placeholder="Digite o número do cartão"
            {...register(`creditCards.${index}.number`)}
            error={errors.number as FieldError}
            // disabled={editSection !== section}
          />
          <Input
            label="Nome impresso"
            placeholder="Digite o nome"
            {...register(`creditCards.${index}.namePrinted`)}
            error={errors.namePrinted as FieldError}
            // disabled={editSection !== section}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="CVV"
              placeholder="Digite o cvv"
              {...register(`creditCards.${index}.cvv`)}
              error={errors.cvv as FieldError}
              // disabled={editSection !== section}
            />
            <Input
              label="Data de validade"
              type="date"
              placeholder="Digite a data de validade"
              {...register(`creditCards.${index}.dateExpired`)}
              error={errors.dateExpired as FieldError}
              // disabled={editSection !== section}
            />
          </div>

          <Checkbox
            label="Preferencial"
            {...register(`creditCards.${index}.preferential`)}
            // disabled={editSection !== section}
          />

          <ButtonCancel text="Remover cartão" onClick={() => remove(index)} />
        </div>
      ))}
    </form>
  );
}
