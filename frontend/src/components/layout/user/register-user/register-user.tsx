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

import { getCep } from "@/services/cep";
import { formatPhone } from "@/utils/mask/format-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FocusEvent } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { AddressFormUser } from "./address-form-user";
import { addressEmpty } from "@/components/validation/address-schema.form";

export function RegisterUser() {
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

  const fieldArrays = {
    addresses: useFieldArray({ control, name: "addresses" }),
  };

  const onSubmit: SubmitHandler<IClientSchemaForm> = (data) => {
    console.log(data);

    router.push("/produtos");

    toast.success("Usuário cadastrado com sucesso!");
  };

  return (
    <div className="min-h-screen py-8">
      <TitlePage title="Cadastro de usuário" />

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

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-normal text-base text-primary-light">Tipo:</p>

              <Radio label="Fixo" value="Fixo" {...register("typePhone")} />
              <Radio
                label="Celular"
                value="Celular"
                {...register("typePhone")}
              />

              {errors.typePhone && (
                <small className="text-error text-xs mt-1">
                  {errors.typePhone.message}
                </small>
              )}
            </div>

            <Controller
              name="numberPhone"
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
            <label htmlFor="">Gênero</label>

            <div>
              <Radio
                label="Masculino"
                value="Masculino"
                {...register("gender")}
              />
              <Radio
                label="Feminino"
                value="Feminino"
                {...register("gender")}
              />
            </div>

            <span className="text-sm text-error">{errors.gender?.message}</span>
          </div>
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

        <div className="flex gap-4 mt-4">
          <ButtonGeneral text="Cadastrar" type="submit" className="w-full" />
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
    </div>
  );
}
