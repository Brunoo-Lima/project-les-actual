import { IUser } from "@/@types/IUser";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import {
  ClientSchemaForm,
  IClientSchemaForm,
} from "@/components/validation/client-schema-form";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { SectionType } from "../edit-user/edit-user";
import {
  emptyPhone,
  IPhoneSchemaForm,
} from "@/components/validation/phone-schema-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { createPhone, deletePhone, updatePhone } from "@/services/phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatPhone } from "@/utils/mask/format-phone";

interface IPhoneFormUserEditProps {
  phones: IUser["phones"];
  userId: string;
  editSection: SectionType;
  startEditingSection: (section: SectionType) => void;
  stopEditingSection: () => void;
}

export function PhoneFormUserEdit({
  phones,
  editSection,
  startEditingSection,
  stopEditingSection,
  userId,
}: IPhoneFormUserEditProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    // resolver: yupResolver(ClientSchemaForm),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  const phoneType = watch("type");

  useEffect(() => {
    console.log("Phones recebidos:", phones);
    if (phones) {
      setValue("phones", phones);
    }
  }, [phones, setValue]);

  useEffect(() => {
    console.log(
      "IDs dos telefones:",
      fields.map((phone) => phone.id)
    );
  }, [fields]);

  console.log("phones", phones);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      for (const phone of data.phones) {
        if (phone.id) {
          // Se o telefone já tem ID, é uma atualização
          const data = await updatePhone(userId, phone.id, phone);

          console.log("teste", data);
        } else {
          // Se não tem ID, é um novo telefone
          await createPhone(userId, phone);
        }
      }
      toast.success("Telefones salvos com sucesso!");
      stopEditingSection();
    } catch (error) {
      toast.error("Erro ao salvar telefones");
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhone = async (phoneId: string, index: number) => {
    console.log("ID do telefone a ser removido:", phoneId);
    setLoading(true);
    if (phoneId) {
      try {
        await deletePhone(phoneId);
        remove(index);
        toast.success("Telefone removido com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar telefone:", error);
        toast.error("Erro ao remover telefone");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4"
    >
      <div className="flex flex-col gap-4">
        {fields.map((phone, index) => {
          const phoneType = watch(`phones.${index}.type`);

          return (
            <div className="flex flex-col gap-2" key={index}>
              <h3 className="text-xl font-semibold text-primary-dark">
                Telefone {index + 1}
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-normal text-base text-primary-light">
                    Tipo:
                  </p>

                  <Radio
                    label="Fixo"
                    value="Fixo"
                    {...register(`phones.${index}.type`)}
                  />
                  <Radio
                    label="Celular"
                    value="Móvel"
                    {...register(`phones.${index}.type`)}
                  />

                  {/* {errors.phones?.[index]?.type && (
                  <small className="text-error text-sm mt-1">
                    {errors.root?.message}
                  </small>
                )} */}
                </div>

                <Controller
                  name={`phones.${index}.number`}
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      label="Telefone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formatPhone(value, phoneType)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        onChange(rawValue);
                      }}
                      ref={ref}
                      maxLength={phoneType === "Fixo" ? 10 : 11}
                    />
                  )}
                />
              </div>
              <ButtonCancel
                type="button"
                text="Remover telefone"
                onClick={() => handleRemovePhone(phone.id, index)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <ButtonGeneral
          className="min-w-72"
          type="button"
          text="Adicionar Telefone"
          onClick={() => append(emptyPhone)}
        />
        <ButtonGeneral
          className="min-w-28"
          type="submit"
          text={loading ? "Salvando..." : "Salvar"}
          disabled={loading}
        />
      </div>
    </form>
  );
}
