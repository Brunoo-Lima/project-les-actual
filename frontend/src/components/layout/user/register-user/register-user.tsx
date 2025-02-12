"use client";

import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import { SelectComponent } from "@/components/ui/select/select";
import { TitlePage } from "@/components/ui/title/title-page/title-page";
import {
  ClientSchemaForm,
  emptyClient,
  IClientSchemaForm,
  mockClient,
} from "@/components/validation/client-schema-form";
import {
  selectStates,
  selectTypePublicPlace,
  selectTypeResidence,
} from "@/mocks/select/select";
import { getCep } from "@/services/cep";
import { formatPhone } from "@/utils/mask/format-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FocusEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const handleAddCep = async (e: FocusEvent<HTMLInputElement>, cep: string) => {
    cep = e.target.value.replace(/[^0-9]/g, "");

    try {
      const data = await getCep(cep);

      if (data) {
        setValue("zipCode", data.cep);
        setValue("street", data.logradouro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
        setValue("neighborhood", data.bairro);
      }
    } catch (error) {
      toast.warning("CEP inválido");
    }
  };

  const onSubmit: SubmitHandler<IClientSchemaForm> = (data) => {
    console.log(data);

    router.push("/produtos");

    toast.success("Usuário cadastrado com sucesso!");
  };

  return (
    <div className="min-h-screen py-8">
      <TitlePage title="Cadastro de usuários" />

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

          <div className="flex gap-4">
            <Input
              label="CEP"
              placeholder="Digite o cep"
              {...register(`zipCode`, {
                onChange: (e) => handleAddCep(e, e.target.value),
              })}
              error={errors.zipCode}
            />
            <Input
              label="Rua"
              placeholder="Digite a rua"
              {...register(`street`)}
              error={errors.street}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="typePublicPlace"
              render={({ field, fieldState }) => (
                <SelectComponent
                  label="Tipo Logradouro"
                  placeholder="Selecione o tipo"
                  options={selectTypePublicPlace}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  error={fieldState.error}
                />
              )}
            />

            <Controller
              control={control}
              name="typeResidence"
              render={({ field, fieldState }) => (
                <SelectComponent
                  label="Tipo residência"
                  placeholder="Selecione o tipo"
                  options={selectTypeResidence}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  error={fieldState.error}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Bairro"
              placeholder="Digite o bairro"
              {...register(`neighborhood`)}
              error={errors.neighborhood}
            />
            <Input
              label="Número"
              placeholder="Digite o número"
              {...register(`number`)}
              error={errors.number}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Cidade"
              placeholder="Digite o cidade"
              {...register(`city`)}
              error={errors.city}
            />
            <Controller
              control={control}
              name="state"
              render={({ field, fieldState }) => (
                <SelectComponent
                  label="Estado"
                  placeholder="Selecione o estado"
                  options={selectStates}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  error={fieldState.error}
                />
              )}
            />

            <Input
              label="País"
              placeholder="Digite o país"
              {...register(`country`)}
              error={errors.country}
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
        </div>
      </form>
    </div>
  );
}
