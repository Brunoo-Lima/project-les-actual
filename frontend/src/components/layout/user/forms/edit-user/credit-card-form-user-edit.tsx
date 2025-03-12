import { ICreditCard } from "@/@types/ICreditCard";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { SelectComponent } from "@/components/ui/select/select";
import { IClientSchemaForm } from "@/components/validation/client-schema-form";
import { selectFlagCard } from "@/mocks/select/select";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import { SectionType } from "./edit-user";

interface ICreditCardFormUserEditProps {
  register: UseFormRegister<IClientSchemaForm>;
  errors: Partial<Record<keyof ICreditCard, FieldError>>;
  control: Control<IClientSchemaForm>;
  removeCreditCard: () => void;
  index: number;
  editSection?: SectionType;
  section?: string;
}

export function CreditCardFormUserEdit({
  register,
  errors,
  control,
  removeCreditCard,
  index,
  editSection,
  section,
}: ICreditCardFormUserEditProps) {
  return (
    <div className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4">
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
            disabled={editSection !== section}
            error={fieldState.error}
          />
        )}
      />

      <Input
        label="Número do cartão"
        placeholder="Digite o número do cartão"
        {...register(`creditCards.${index}.number`)}
        error={errors.number}
        disabled={editSection !== section}
      />
      <Input
        label="Nome impresso"
        placeholder="Digite o nome"
        {...register(`creditCards.${index}.namePrinted`)}
        error={errors.namePrinted}
        disabled={editSection !== section}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="CVV"
          placeholder="Digite o cvv"
          {...register(`creditCards.${index}.cvv`)}
          error={errors.cvv}
          disabled={editSection !== section}
        />
        <Input
          label="Data de validade"
          type="date"
          placeholder="Digite a data de validade"
          {...register(`creditCards.${index}.dateExpired`)}
          error={errors.dateExpired}
          disabled={editSection !== section}
        />
      </div>

      <Checkbox
        label="Preferencial"
        {...register(`creditCards.${index}.preferential`)}
        disabled={editSection !== section}
      />

      <ButtonCancel text="Remover cartão" onClick={removeCreditCard} />
    </div>
  );
}

