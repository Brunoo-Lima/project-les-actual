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

import { usersList } from "@/mocks/users-list";
import { formatPhone } from "@/utils/mask/format-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { PhoneFormUser } from "../register-user/phone-form-user";
import { emptyPhone } from "@/components/validation/phone-schema-form";
import { AddressFormUser } from "../register-user/address-form-user";
import { addressEmpty } from "@/components/validation/address-schema-form";
import { CreditCardFormUser } from "../register-user/credit-card-form-user";
import { emptyCreditCard } from "@/components/validation/credit-card-schema-form";
import { ButtonsActions } from "./buttons-actions";

export type SectionType =
  | "addresses"
  | "phones"
  | "creditCards"
  | "personal"
  | null;

export function EditUser() {
  const router = useRouter();
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
    const client = usersList.filter((user) => user.id === 1)[0];

    if (client) {
      setValue("name", client.name);
      setValue("cpf", client.cpf);
      setValue("email", client.email);
      setValue("gender", client.gender);
      setValue("status", client.status);
      // setValue("dateOfBirth", client.dateOfBirth);
      setValue("dateOfBirth", "1990-01-01");
      // setValue("password", client.password);
      // setValue("confirmPassword", client.confirmPassword);

      // setValue(`phones.0.numberPhone`, formatPhone(client.phone));
      // setValue(`phones.0.typePhone`, client.typePhone);

      // setValue(`addresses.0.street`, client.address[0].street);
      // setValue("number", client.address.number);
      // setValue("neighborhood", client.address.neighborhood);
      // setValue("city", client.address.city);
      // setValue("state", client.address.state);
      // setValue("country", client.address.country);
      // setValue("zipCode", client.address.zipCode);
      // setValue("typeResidence", client.address.typeResidence);
      // setValue("typePublicPlace", client.address.typePublicPlace);
      // setValue("namePrinted", client.creditCard.namePrinted);
      // setValue("cvv", client.creditCard.cvv);
      // setValue("expirationDate", client.creditCard.expirationDate);
      // setValue("numberCard", client.creditCard.number);
      // setValue("flag", client.creditCard.flag);
    }
  }, [reset]);

  const startEditingSection = (section: typeof editSection) => {
    setEditSection(section);
  };

  const stopEditingSection = () => setEditSection(null);

  const onSubmit: SubmitHandler<IClientSchemaForm> = (data) => {
    console.log(data);

    router.push("/produtos");

    toast.success("Usuário editado com sucesso!");
  };

  return (
    <section className="min-h-screen py-8">
      <TitlePage title="Editar meus dados" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[900px] flex flex-col gap-y-4"
      >
        <Input
          label="Nome"
          placeholder="Digite o nome"
          {...register("name")}
          error={errors.name}
          disabled={editSection !== "personal"}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="CPF"
            placeholder="Digite o CPF"
            {...register("cpf")}
            error={errors.cpf}
            disabled={editSection !== "personal"}
          />
          <Input
            type="date"
            label="Data de nascimento"
            {...register("dateOfBirth")}
            error={errors.dateOfBirth}
            disabled={editSection !== "personal"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="">Gênero</label>

            <div>
              <Radio
                label="Masculino"
                value="Masculino"
                {...register("gender")}
                disabled={editSection !== "personal"}
              />
              <Radio
                label="Feminino"
                value="Feminino"
                {...register("gender")}
                disabled={editSection !== "personal"}
              />
            </div>

            <span className="text-sm text-error">{errors.gender?.message}</span>
          </div>

          <div>
            <p className="block text-sm font-medium text-white">
              Status do cliente
            </p>

            <Radio
              label="Ativo"
              value="Ativo"
              {...register("status")}
              disabled={editSection !== "personal"}
            />
            <Radio
              label="Inativo"
              value="Inativo"
              {...register("status")}
              disabled={editSection !== "personal"}
            />
            {errors.status && (
              <span className="text-red-600 text-sm">
                {errors.status.message}
              </span>
            )}
          </div>
        </div>

        <Input
          label="Email"
          placeholder="Digite o email"
          {...register("email")}
          error={errors.email}
          disabled={editSection !== "personal"}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Senha"
            placeholder="Digite a senha"
            {...register("password")}
            error={errors.password}
            disabled={editSection !== "personal"}
          />
          <Input
            label="Confirme a senha"
            placeholder="Digite a senha novamente"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            disabled={editSection !== "personal"}
          />
        </div>

        <ButtonsActions
          textButtonSection="Salvar dados pessoais"
          editSection={editSection}
          startEditingSection={startEditingSection}
          stopEditingSection={stopEditingSection}
          section="personal"
        />

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

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold my-4">Endereço</h2>
          {fieldArrays.addresses.fields.map((address, index) => (
            <AddressFormUser
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
            <CreditCardFormUser
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
      </form>
    </section>
  );
}
