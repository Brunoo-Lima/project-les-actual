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

interface IModalStatusUserProps {
  onClose: () => void;
  user: Partial<IUser> | null;
}

export function ModalStatusUser({ onClose, user }: IModalStatusUserProps) {
  const { control, handleSubmit } = useForm<IStatusSchemaForm>({
    resolver: yupResolver(StatusSchemaForm),
  });
  const handleSaveStatus: SubmitHandler<IStatusSchemaForm> = (data: {
    status: string;
  }) => {
    const updatedData = {
      status: data.status,
    };

    console.log("data", updatedData);
    toast.success("Status atualizado com sucesso!");
    onClose();
  };

  if (!user) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[400px] h-[250px] p-4 rounded-lg overflow-auto container-modal">
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
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                error={fieldState.error}
              />
            )}
          />

          <ButtonGeneral type="submit" text="Salvar" className="mt-4" />
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
