"use client";

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
import { AddressFormUser } from "./address-form-user";
import { addressEmpty } from "@/components/validation/address-schema-form";
import { PhoneFormUser } from "./phone-form-user";
import { emptyPhone } from "@/components/validation/phone-schema-form";
import { emptyCreditCard } from "@/components/validation/credit-card-schema-form";
import { CreditCardFormUser } from "./credit-card-form-user";
import { useData } from "@/hooks/useData";
import { createClient } from "@/services/client";
import { useState } from "react";

export function RegisterUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setUsers } = useData();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<IClientSchemaForm>({
    resolver: yupResolver(ClientSchemaForm),
  });

  const fieldArrays = {
    addresses: useFieldArray({ control, name: "addresses" }),
    phones: useFieldArray({ control, name: "phones" }),
    creditCards: useFieldArray({ control, name: "creditCards" }),
  };

  const onSubmit: SubmitHandler<IClientSchemaForm> = async (data) => {
    setLoading(true);
    try {
      const formattedData: any = {
        ...data,
      };

      const updatedData = await createClient(formattedData);

      setUsers((prevUsers) => [...prevUsers, updatedData]);

      router.push("/");

      toast.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar cliente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-8 px-8 mx-auto w-[1300px]">
      <TitlePage title="Cadastro de cliente" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[900px] flex flex-col gap-y-4"
      >
        <Input
          label="Nome"
          placeholder="Digite o nome"
          {...register("name")}
          error={errors.name}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="CPF"
            placeholder="Digite o CPF"
            {...register("cpf")}
            error={errors.cpf}
          />
          <Input
            type="date"
            label="Data de nascimento"
            {...register("dateOfBirth")}
            error={errors.dateOfBirth}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold my-4">Telefone</h2>
          {fieldArrays.phones.fields.map((phone, index) => {
            const phoneType = watch(`phones.${index}.type`);
            return (
              <PhoneFormUser
                key={phone.id}
                index={index}
                register={register}
                errors={errors.phones?.[index] || {}}
                control={control}
                phoneType={phoneType}
                removePhone={() => fieldArrays.phones.remove(index)}
              />
            );
          })}

          <ButtonGeneral
            text="Adicionar telefone"
            onClick={() => fieldArrays.phones.append(emptyPhone)}
            className="bg-emerald-400 hover:bg-emerald-700 w-60"
          />
        </div>

        <div>
          <label htmlFor="">Gênero</label>

          <div>
            <Radio
              label="Masculino"
              value="Masculino"
              {...register("gender")}
            />
            <Radio label="Feminino" value="Feminino" {...register("gender")} />
          </div>

          <span className="text-sm text-error mt-1">
            {errors.gender?.message}
          </span>
        </div>

        <Input
          label="Email"
          placeholder="Digite o email"
          {...register("email")}
          error={errors.email}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Senha"
            placeholder="Digite a senha"
            {...register("password")}
            error={errors.password}
          />
          <Input
            label="Confirme a senha"
            placeholder="Digite a senha novamente"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
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
            />
          ))}

          <ButtonGeneral
            text="Adicionar endereço"
            onClick={() => fieldArrays.addresses.append(addressEmpty)}
            className="bg-emerald-400 hover:bg-emerald-700 w-60"
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
            />
          ))}

          <ButtonGeneral
            text="Adicionar cartão de crédito"
            onClick={() => fieldArrays.creditCards.append(emptyCreditCard)}
            className="bg-emerald-400 hover:bg-emerald-700 w-60"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <ButtonGeneral
            className="w-full"
            type="submit"
            disabled={loading}
            text={loading ? "Salvando..." : "Cadastrar"}
          />
          <ButtonCancel
            text="Limpar"
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
