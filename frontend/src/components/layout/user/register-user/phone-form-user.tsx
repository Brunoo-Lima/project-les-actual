import { IPhone } from "@/@types/IUser";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import { IClientSchemaForm } from "@/components/validation/client-schema-form";
import { formatPhone } from "@/utils/mask/format-phone";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from "react-hook-form";

interface IPhoneFormUserProps {
  register: UseFormRegister<IClientSchemaForm>;
  errors: Partial<Record<keyof IPhone, FieldError>>;
  control: Control<IClientSchemaForm>;
  index: number;
  removePhone: () => void;
}

export function PhoneFormUser({
  register,
  errors,
  control,
  index,
  removePhone,
}: IPhoneFormUserProps) {
  return (
    <div className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4">
      <h3 className="text-xl font-semibold text-primary-dark">
        Telefone {index + 1}
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-normal text-base text-primary-light">Tipo:</p>

          <Radio
            label="Fixo"
            value="Fixo"
            {...register(`phones.${index}.typePhone`)}
          />
          <Radio
            label="Celular"
            value="Celular"
            {...register(`phones.${index}.typePhone`)}
          />

          {errors.typePhone && (
            <small className="text-error text-xs mt-1">
              {errors.typePhone.message}
            </small>
          )}
        </div>

        <Controller
          name={`phones.${index}.numberPhone`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formatPhone(value)}
              onChange={onChange}
              ref={ref}
              error={errors.numberPhone}
              maxLength={15}
            />
          )}
        />
      </div>

      <div>
        <ButtonCancel text="Remover telefone" onClick={removePhone} />
      </div>
    </div>
  );
}
