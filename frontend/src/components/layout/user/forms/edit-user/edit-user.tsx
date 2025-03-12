"use client";

import { useEffect, useState } from "react";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import { TitlePage } from "@/components/ui/title/title-page/title-page";
import {
  ClientSchemaForm,
  emptyClient,
  IClientSchemaForm,
  mockClient,
} from "@/components/validation/client-schema-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { PhoneFormUser } from "../register-user/phone-form-user";
import { emptyPhone } from "@/components/validation/phone-schema-form";
import { AddressFormUser } from "../register-user/address-form-user";
import { addressEmpty } from "@/components/validation/address-schema-form";
import { emptyCreditCard } from "@/components/validation/credit-card-schema-form";
import { ButtonsActions } from "./buttons-actions";
import { formatPhone } from "@/utils/mask/format-phone";
import { useData } from "@/hooks/useData";
import { detailClient } from "@/services/client";
import { PersonalUser } from "./personal-user";
import { AddressFormUserEdit } from "./address-form-user-edit";
import { CreditCardFormUserEdit } from "./credit-card-form-user-edit";

export type SectionType =
  | "addresses"
  | "phones"
  | "creditCards"
  | "personal"
  | null;

export function EditUser() {
  const router = useRouter();
  const { setUsers } = useData();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<IClientSchemaForm>({
    resolver: yupResolver(ClientSchemaForm),
  });
  const [editSection, setEditSection] = useState<SectionType>(null);

  const fieldArrays = {
    addresses: useFieldArray({ control, name: "addresses" }),
    phones: useFieldArray({ control, name: "phones" }),
    creditCards: useFieldArray({ control, name: "creditCards" }),
  };

  useEffect(() => {
    // const fetchClient = async () => {
    //   const client = await detailClient()
    // }
  }, [reset, setValue]);

  const startEditingSection = (section: typeof editSection) => {
    setEditSection(section);
  };

  const stopEditingSection = () => setEditSection(null);

  const onSubmit: SubmitHandler<IClientSchemaForm> = (data) => {
    console.log(data);

    setUsers((prevUsers) => [...prevUsers, data]);

    router.push("/produtos");

    toast.success("Usuário editado com sucesso!");
  };

  return (
    <section className="min-h-screen py-8">
      <TitlePage title="Editar meus dados" />

      <PersonalUser />

      <div className="w-[900px] flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold my-4">Telefone</h2>
          {fieldArrays.phones.fields.map((phone, index) => (
            <PhoneFormUser
              key={phone.id}
              index={index}
              register={register}
              errors={errors.phones?.[index] || {}}
              control={control}
              removePhone={() => fieldArrays.phones.remove(index)}
              editSection={editSection}
              section="phones"
            />
          ))}

          <ButtonGeneral
            text="Adicionar telefone"
            onClick={() => fieldArrays.phones.append(emptyPhone)}
            disabled={editSection !== "phones"}
            className={`${
              editSection !== "phones"
                ? "opacity-70 hover:opacity-70 cursor-not-allowed"
                : "hover:bg-emerald-700 "
            } w-60 bg-emerald-400`}
          />

          <ButtonsActions
            textButtonSection="Salvar telefones"
            editSection={editSection}
            startEditingSection={startEditingSection}
            stopEditingSection={stopEditingSection}
            section="phones"
          />
        </div>

        {/* <AddressFormUserEdit /> */}

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold my-4">Endereço</h2>
          {fieldArrays.addresses.fields.map((address, index) => (
            <AddressFormUserEdit
              key={address.id}
              index={index}
              register={register}
              errors={errors.addresses?.[index] || {}}
              control={control}
              setValue={setValue}
              removeAddress={() => fieldArrays.addresses.remove(index)}
              editSection={editSection}
              section="addresses"
            />
          ))}

          <ButtonGeneral
            text="Adicionar endereço"
            onClick={() => fieldArrays.addresses.append(addressEmpty)}
            disabled={editSection !== "addresses"}
            className={`${
              editSection !== "addresses"
                ? "opacity-70 hover:opacity-70 cursor-not-allowed"
                : "hover:bg-emerald-700 "
            } w-60 bg-emerald-400`}
          />

          <ButtonsActions
            textButtonSection="Salvar endereços"
            editSection={editSection}
            startEditingSection={startEditingSection}
            stopEditingSection={stopEditingSection}
            section="addresses"
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold my-4">Cartão de crédito</h2>

          {fieldArrays.creditCards.fields.map((card, index) => (
            <CreditCardFormUserEdit
              key={card.id}
              index={index}
              register={register}
              errors={errors.creditCards?.[index] || {}}
              control={control}
              removeCreditCard={() => fieldArrays.creditCards.remove(index)}
              editSection={editSection}
              section="creditCards"
            />
          ))}

          <ButtonGeneral
            text="Adicionar cartão de crédito"
            onClick={() => fieldArrays.creditCards.append(emptyCreditCard)}
            disabled={editSection !== "creditCards"}
            className={`${
              editSection !== "creditCards"
                ? "opacity-70 hover:opacity-70 cursor-not-allowed"
                : "hover:bg-emerald-700 "
            } w-60 bg-emerald-400`}
          />

          <ButtonsActions
            textButtonSection="Salvar cartões"
            editSection={editSection}
            startEditingSection={startEditingSection}
            stopEditingSection={stopEditingSection}
            section="creditCards"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <ButtonGeneral text="Salvar" type="submit" className="w-full" />
          <ButtonCancel
            text="Cancelar"
            className="w-full"
            onClick={() => reset(emptyClient)}
          />

          <button
            type="button"
            className="bg-blue-500 rounded-md w-full text-white"
            onClick={() => reset(mockClient)}
          >
            Mock Cliente
          </button>
        </div>
      </div>
    </section>
  );
}
