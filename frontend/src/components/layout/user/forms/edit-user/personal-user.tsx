import { IUser } from "@/@types/IUser";
import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import {
  ClientSchemaForm,
  IClientSchemaForm,
} from "@/components/validation/client-schema-form";
import { updateClient } from "@/services/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { SectionType } from "./edit-user";
import { useEffect } from "react";
import { toast } from "sonner";

interface IPersonalUserProps {
  clientData: IUser | null;
  editSection: SectionType;
  startEditingSection: (section: SectionType) => void;
  stopEditingSection: () => void;
}

export function PersonalUser({
  clientData,
  editSection,
  startEditingSection,
  stopEditingSection,
}: IPersonalUserProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IClientSchemaForm>({
    resolver: yupResolver(ClientSchemaForm),
  });

  useEffect(() => {
    if (clientData) {
      setValue("name", clientData.name);
      setValue("email", clientData.email);
      setValue("cpf", clientData.cpf);
      setValue("dateOfBirth", clientData.dateOfBirth);
      setValue("gender", clientData.gender);
    }
  }, [clientData, setValue]);

  const onSubmit: SubmitHandler<Partial<IClientSchemaForm>> = async (
    data: any
  ) => {
    try {
      if (clientData?.id) {
        await updateClient(clientData?.id, data);
      }

      toast.success("Cliente editado com sucesso!");

      stopEditingSection();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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

      <button>Editar</button>
      <button>Salvar dados</button>
    </form>
  );
}
