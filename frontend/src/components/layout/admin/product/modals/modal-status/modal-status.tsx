import { Modal } from "@/components/modal";
import {
  selectCategoryIsAvailable,
  selectStatus,
} from "./../../../../../../mocks/select/select";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IStatusSchemaForm,
  StatusSchemaForm,
} from "@/components/validation/product-schema-form";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { IProduct } from "@/@types/IProduct";
import { SelectComponent } from "@/components/ui/select/select";
import { updateStatusProduct } from "@/services/product";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea/textarea";

interface IModalStatusProps {
  onClose: () => void;
  product: Partial<IProduct> | null;
}

export function ModalStatus({ onClose, product }: IModalStatusProps) {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<IStatusSchemaForm>({
    resolver: yupResolver(StatusSchemaForm),
  });

  useEffect(() => {
    if (product) {
      const statusValue = product.isAvailable ? "Ativo" : "Inativo";
      setValue("status", statusValue as any);
    }
  }, [product, setValue]);

  const handleSaveStatus: SubmitHandler<IStatusSchemaForm> = async (
    data: any
  ) => {
    try {
      const payload = {
        ...data,
        status: data.status === "Ativo" ? true : false,
      };

      const response = await updateStatusProduct(
        product?.id as string,
        payload
      );

      toast.success("Status atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar status do produto", error);
    }
  };

  if (!product) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[400px] h-[450px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Status do produto" onClick={onClose} />

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

          <Controller
            control={control}
            name="categoryIsAvailable"
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Categoria de produto"
                placeholder="Selecione o status"
                options={selectCategoryIsAvailable}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                error={fieldState.error}
              />
            )}
          />

          <Textarea
            label="Justificativa de inativação/ativação"
            {...register("inactiveReason")}
            error={errors.inactiveReason}
          />

          <ButtonGeneral type="submit" text="Salvar" className="mt-4" />
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
