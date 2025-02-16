import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { useState } from "react";
import { PaymentForm } from "./modal-forms/payment-form";
import { Plus } from "@phosphor-icons/react";
import { CreditCard } from "../ui/credit-card";
import { useCheckout } from "@/hooks/useCheckout";

//TODO: Implementar talvez um sistema de parcelamento
//TODO: implementar talvez um sistema de cupons, no qual o usuario pode escolher o cupom para pagar e tbm o cartao, tem a opção cupom no começo porém aquele é mais promocional

export function Payment() {
  const { handleSelectCreditCard, cards, selectedCreditCard } = useCheckout();
  const [isOpenModalAddPayment, setIsOpenModalAddPayment] =
    useState<boolean>(false);

  const handleOpenModalPayment = () => {
    setIsOpenModalAddPayment(true);
  };

  const handleCloseModalPayment = () => {
    setIsOpenModalAddPayment(false);
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] h-[500px] p-6 border border-gray-700 rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold">Cartões de crédito cadastrados</h2>
      <div className="overflow-auto h-[400px] container-address-form flex flex-col gap-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <CreditCard
              key={card.id}
              card={card}
              onSelectCreditCard={handleSelectCreditCard}
              isSelected={selectedCreditCard?.id === card.id}
            />
          ))
        ) : (
          <p>Não há cartões cadastrados.</p>
        )}
      </div>

      <div>
        <button
          type="button"
          className="bg-primary-dark text-background p-2 rounded-md font-semibold text-base w-60 flex items-center justify-center gap-2 transition duration-300 hover:bg-primary"
          onClick={handleOpenModalPayment}
        >
          <Plus size={16} weight="bold" />
          Cadastrar novo cartão
        </button>
      </div>

      {isOpenModalAddPayment && (
        <ModalBackground>
          <PaymentForm onClose={handleCloseModalPayment} />
        </ModalBackground>
      )}
    </div>
  );
}
