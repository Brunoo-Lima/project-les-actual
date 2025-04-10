import { IPhone } from "@/@types/IUser";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import { IClientSchemaForm } from "@/components/validation/client-schema-form";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { SectionType } from "../edit-user/edit-user";
import { IPhoneSchemaForm } from "@/components/validation/phone-schema-form";
import { formatPhone } from "@/utils/mask/format-phone";

interface IPhoneFormUserProps {
  register: UseFormRegister<IClientSchemaForm>;
  errors: any;
  control: Control<IClientSchemaForm>;
  index: number;
  removePhone: () => void;
  editSection?: SectionType;
  section?: string;
  phoneType: string;
}

export function PhoneFormUser({
  register,
  errors,
  control,
  index,
  removePhone,
  editSection,
  section,
  phoneType,
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
            {...register(`phones.${index}.type`)}
            disabled={editSection !== section}
          />
          <Radio
            label="Celular"
            value="Móvel"
            {...register(`phones.${index}.type`)}
            disabled={editSection !== section}
          />

          {errors.type && (
            <small className="text-error text-sm mt-1">
              {errors.type.message}
            </small>
          )}
        </div>

        <Controller
          name={`phones.${index}.number`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formatPhone(value, phoneType as any)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                onChange(rawValue);
              }}
              ref={ref}
              error={errors.number}
              disabled={editSection !== section}
              maxLength={phoneType === "Fixo" ? 10 : 11}
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
