import { Input } from "@/components/ui/input/input";
import { Radio } from "@/components/ui/radio/radio";
import {
  ClientSchemaForm,
  IClientSchemaForm,
} from "@/components/validation/client-schema-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export function PersonalUser() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IClientSchemaForm>({
    resolver: yupResolver(ClientSchemaForm),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
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

        <div>
          <p className="block text-sm font-medium text-white">
            Status do cliente
          </p>

          <Radio label="Ativo" value="Ativo" {...register("status")} />
          <Radio label="Inativo" value="Inativo" {...register("status")} />
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

      {/* <ButtonsActions
              textButtonSection="Salvar dados pessoais"
              editSection={editSection}
              startEditingSection={startEditingSection}
              stopEditingSection={stopEditingSection}
              section="personal"
            /> */}
    </form>
  );
}

