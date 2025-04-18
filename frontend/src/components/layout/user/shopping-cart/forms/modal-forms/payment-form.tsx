import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { SelectComponent } from "@/components/ui/select/select";
import {
  CreditCardSchemaForm,
  ICreditCardSchemaForm,
} from "@/components/validation/credit-card-schema-form";
import { useCheckout } from "@/hooks/useCheckout";
import { selectFlagCard } from "@/mocks/select/select";
import { createCreditCard } from "@/services/credit-card";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IPaymentFormProps {
  onClose: () => void;
}

export function PaymentForm({ onClose }: IPaymentFormProps) {
  const { handleAddCreditCardOnOrder } = useCheckout();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreditCardSchemaForm>({
    resolver: yupResolver(CreditCardSchemaForm),
  });

  const onSubmit: SubmitHandler<ICreditCardSchemaForm> = async (data: any) => {
    try {
      const userData = localStorage.getItem("@user:data");

      if (!userData) {
        toast.error("Nenhum cliente encontrado!");
      }

      const parsedUserData = JSON.parse(userData as string);

      const updatedData = await createCreditCard(parsedUserData.id, data);

      handleAddCreditCardOnOrder(updatedData);

      toast.success("Cartão de crédito cadastrado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar cartão de crédito:", error);
      toast.error("Erro ao cadastrar cartão de crédito!");
    }
  };

  return (
    <Modal.Root className="w-[600px] h-[550px] overflow-auto p-4">
      <Modal.Header title="Métodos de pagamento" onClick={onClose} />

      <Modal.Content>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-2"
        >
          <Controller
            control={control}
            name="flag"
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Bandeira"
                placeholder="Selecione a bandeira"
                options={selectFlagCard}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                error={fieldState.error}
              />
            )}
          />

          <Input
            label="Número do cartão"
            placeholder="Digite o número do cartão"
            {...register("number")}
            error={errors.number}
          />
          <Input
            label="Nome impresso"
            placeholder="Digite o nome"
            {...register("namePrinted")}
            error={errors.namePrinted}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="CVV"
              placeholder="Digite o cvv"
              {...register("cvv")}
              error={errors.cvv}
            />
            <Input
              label="Data de validade"
              type="date"
              placeholder="Digite a data de validade"
              {...register("dateExpired")}
              error={errors.dateExpired}
            />
          </div>

          <Checkbox label="Preferencial" {...register("preferential")} />

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="bg-primary text-background p-2 rounded-md font-semibold text-base w-60 transition duration-300 hover:bg-primary-dark"
            >
              Salvar
            </button>
            <ButtonCancel text="Limpar campos" />
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
