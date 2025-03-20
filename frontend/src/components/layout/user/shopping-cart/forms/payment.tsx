import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { useState } from "react";
import { PaymentForm } from "./modal-forms/payment-form";
import { Plus } from "@phosphor-icons/react";
import { CreditCard } from "../ui/credit-card";
import { useCheckout } from "@/hooks/useCheckout";
import { SelectComponent } from "@/components/ui/select/select";
import { selectParcelas } from "@/mocks/select/select";
import { Input } from "@/components/ui/input/input";
import { FormatValue } from "@/utils/format-value";
// import { Checkbox } from "@/components/ui/checkbox/checkbox";

//TODO: Implementar talvez um sistema de parcelamento
//TODO: implementar talvez um sistema de cupons, no qual o usuario pode escolher o cupom para pagar e tbm o cartao, tem a opção cupom no começo porém aquele é mais promocional

export function Payment() {
  const { handleSelectCreditCard, cards, selectedCreditCard, order } =
    useCheckout();
  const [isOpenModalAddPayment, setIsOpenModalAddPayment] =
    useState<boolean>(false);
  const [parcela, setParcela] = useState<number>(1);
  const [value, setValue] = useState<number>(100);

  const handleOpenModalPayment = () => {
    setIsOpenModalAddPayment(true);
  };

  const handleCloseModalPayment = () => {
    setIsOpenModalAddPayment(false);
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] h-[500px] p-6 border border-gray-700 rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold">Forma de pagamento</h2>
      {/* <div className="space-y-4">
        <Checkbox label="Cupom de troca" />
        <Checkbox label="Cartão de crédito" />


      </div>


      <div>
        <Input label="Valor do cupom"  />

      </div> */}
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

      <div className="w-36">
        <Input
          label="Valor cartão 1"
          value={+value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-base">Parcelas:</p>
        <SelectComponent
          placeholder="1x"
          onChange={(e) => setParcela(e.toString())}
          options={selectParcelas}
        />
      </div>

      <div>Valor: {FormatValue(order.total)}</div>
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
