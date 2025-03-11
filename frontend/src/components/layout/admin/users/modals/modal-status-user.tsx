import { Modal } from "@/components/modal";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IStatusSchemaForm,
  StatusSchemaForm,
} from "@/components/validation/product-schema-form";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SelectComponent } from "@/components/ui/select/select";
import { IUser } from "@/@types/IUser";
import { selectStatus } from "@/mocks/select/select";
import { Textarea } from "@/components/ui/textarea/textarea";
import { updateStatusClient } from "@/services/client";
import { revalidateTag } from "next/cache";

interface IModalStatusUserProps {
  onClose: () => void;
  user: Partial<IUser> | null;
}

export function ModalStatusUser({ onClose, user }: IModalStatusUserProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStatusSchemaForm>({
    resolver: yupResolver(StatusSchemaForm),
  });
  const handleSaveStatus: SubmitHandler<IStatusSchemaForm> = async (
    data: IStatusSchemaForm
  ) => {
    try {
      await updateStatusClient(user?.id as string, data);

      //mudar dps
      await fetch("/api/status/revalidate", { method: "POST" });

      // revalidateTag("statusClient");

      toast.success("Status atualizado com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao atualizar status!");
    }
  };

  if (!user) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[400px] h-[350px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Status do usuário" onClick={onClose} />

      <Modal.Content>
        <form
          onSubmit={handleSubmit(handleSaveStatus)}
          className="flex flex-col gap-4"
        >
          <Controller
            control={control}
            name="status"
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Status"
                placeholder="Selecione o status"
                options={selectStatus}
                onChange={(value) => field.onChange(value === "Ativo")}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                error={fieldState.error}
              />
            )}
          />

          <Textarea
            label="Justificativa"
            {...register("inactiveReason")}
            error={errors.inactiveReason}
          />

          <ButtonGeneral type="submit" text="Salvar" className="mt-4" />
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
