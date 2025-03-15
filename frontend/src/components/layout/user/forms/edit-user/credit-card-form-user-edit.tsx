import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { SelectComponent } from "@/components/ui/select/select";
import { selectFlagCard } from "@/mocks/select/select";
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { SectionType } from "./edit-user";
import { IUser } from "@/@types/IUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createCreditCard,
  deleteCreditCard,
  updateCreditCard,
} from "@/services/credit-card";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { emptyCreditCard } from "@/components/validation/credit-card-schema-form";

interface ICreditCardFormUserEditProps {
  creditCards: IUser["creditCards"];
  userId: string;
  editSection: SectionType;
  startEditingSection: (section: SectionType) => void;
  stopEditingSection: () => void;
}

export function CreditCardFormUserEdit({
  creditCards,
  editSection,
  startEditingSection,
  stopEditingSection,
  userId,
}: ICreditCardFormUserEditProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "creditCards",
    keyName: "customId",
  });

  useEffect(() => {
    console.log("creditCards rece", creditCards);
    if (creditCards) {
      reset({
        creditCards: creditCards.map((creditCard) => ({
          customId: creditCard.id,
          id: creditCard.id,
          number: creditCard.number,
          flag: creditCard.flag,
          namePrinted: creditCard.namePrinted,
          dateExpired: creditCard.dateExpired,
          cvv: creditCard.cvv,
          preferential: creditCard.preferential,
        })),
      });
    }
  }, [creditCards, reset]);

  console.log("creditCards", creditCards);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      for (const creditCard of data.creditCards) {
        if (creditCard.id) {
          // Se o endereço já tem ID, é uma atualização
          await updateCreditCard(userId, creditCard.id, creditCard);
          toast.success("Cartão de crédito atualizado com sucesso!");
        } else {
          await createCreditCard(userId, creditCard);
          toast.success("Cartão de crédito criado com sucesso!");
        }
      }
    } catch (error) {
      console.error("Erro ao salvar cartão de crédito!", error);
      toast.error("Erro ao salvar cartão de crédito!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCreditCard = async (
    creditCardId: string,
    index: number
  ) => {
    setLoading(true);
    try {
      await deleteCreditCard(creditCardId, userId);
      remove(index);

      toast.success("Cartão de crédito removido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar cartão de crédito:", error);
      toast.error("Erro ao remover cartão de crédito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border-[0.5px] border-gray-600 rounded-md p-4"
    >
      {fields.map((creditCard, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <h3 className="text-xl font-semibold text-primary-dark">
            Cartão de crédito {index + 1}
          </h3>

          <Controller
            control={control}
            name={`creditCards.${index}.flag`}
            render={({ field, fieldState }) => (
              <SelectComponent
                label="Bandeira"
                placeholder="Selecione a bandeira"
                options={selectFlagCard}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                // disabled={editSection !== section}
                error={fieldState.error}
              />
            )}
          />

          <Input
            label="Número do cartão"
            placeholder="Digite o número do cartão"
            {...register(`creditCards.${index}.number`)}
            error={errors.number as FieldError}
            // disabled={editSection !== section}
          />
          <Input
            label="Nome impresso"
            placeholder="Digite o nome"
            {...register(`creditCards.${index}.namePrinted`)}
            error={errors.namePrinted as FieldError}
            // disabled={editSection !== section}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="CVV"
              placeholder="Digite o cvv"
              {...register(`creditCards.${index}.cvv`)}
              error={errors.cvv as FieldError}
              // disabled={editSection !== section}
            />
            <Input
              label="Data de validade"
              type="date"
              placeholder="Digite a data de validade"
              {...register(`creditCards.${index}.dateExpired`)}
              error={errors.dateExpired as FieldError}
              // disabled={editSection !== section}
            />
          </div>

          <Checkbox
            label="Preferencial"
            {...register(`creditCards.${index}.preferential`)}
            // disabled={editSection !== section}
          />

          <ButtonCancel
            text="Remover cartão"
            onClick={() => handleDeleteCreditCard(creditCard.id, index)}
          />
        </div>
      ))}

      <div className="flex items-center gap-4">
        <ButtonGeneral
          className="min-w-72"
          type="button"
          text="Adicionar Telefone"
          onClick={() => append(emptyCreditCard)}
        />
        <ButtonGeneral
          className="min-w-28"
          type="submit"
          text={loading ? "Salvando..." : "Salvar"}
          disabled={loading}
        />
      </div>
    </form>
  );
}
