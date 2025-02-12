"use client";

import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import { SelectComponent } from "@/components/ui/select/select";
import {
  ClientSchemaForm,
  IClientSchemaForm,
} from "@/components/validation/client-schema-form";
import {
  selectTypePublicPlace,
  selectTypeResidence,
} from "@/mocks/select/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

export function RegisterUser() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IClientSchemaForm>({
    resolver: yupResolver(ClientSchemaForm),
  });

  return (
    <div>
      <h1>Registrar Usuário</h1>

      <div className="w-[900px] flex flex-col gap-y-4">
        <Input label="Nome" placeholder="Digite o nome" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="CPF" placeholder="Digite o CPF" />
          <Input type="date" label="Data de nascimento" />
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

            <Input
              label="Número"
              placeholder="(00) 000000000 "
              {...register("numberPhone")}
              error={errors.numberPhone}
            />
          </div>

          <div>
            <label htmlFor="">Gênero</label>

            <div>
              <Radio label="Masculino" value="Masculino" />
              <Radio label="Feminino" value="Feminino" />
            </div>
          </div>
        </div>

        <Input label="Email" placeholder="Digite o email" />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Senha" placeholder="Digite a senha" />
          <Input
            label="Confirme a senha"
            placeholder="Digite a senha novamente"
          />
        </div>

        <div>
          <h2>Endereço</h2>

          <div>
            <Input
              label="CEP"
              placeholder="Digite o cep"
              {...register(`zipCode`)}
              error={errors.zipCode}
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

          <div>
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

            <Input
              label="Logradouro"
              placeholder="Digite o logradouro"
              {...register(`publicPlace`)}
              error={errors.publicPlace}
            />
          </div>

          <div>
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

          <div>
            <Input
              label="Cidade"
              placeholder="Digite o cidade"
              {...register(`city`)}
              error={errors.city}
            />
            <Input
              label="Estado"
              placeholder="Digite o estado"
              {...register(`state`)}
              error={errors.state}
            />

            <Input
              label="País"
              placeholder="Digite o país"
              {...register(`country`)}
              error={errors.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

