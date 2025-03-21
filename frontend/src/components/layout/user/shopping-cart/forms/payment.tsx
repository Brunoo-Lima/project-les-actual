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
import { ICreditCard } from "@/@types/ICreditCard";
// import { Checkbox } from "@/components/ui/checkbox/checkbox";

//TODO: Implementar talvez um sistema de parcelamento
//TODO: implementar talvez um sistema de cupons, no qual o usuario pode escolher o cupom para pagar e tbm o cartao, tem a opção cupom no começo porém aquele é mais promocional

export function Payment() {
  const { order, cards } = useCheckout();
  const [selectedCards, setSelectedCards] = useState<{
    card1: ICreditCard | null;
    card2: ICreditCard | null;
  }>({ card1: null, card2: null });
  const [values, setValues] = useState<{ value1: number; value2: number }>({
    value1: 0,
    value2: 0,
  });
  const [parcelas, setParcelas] = useState<{
    parcela1: number;
    parcela2: number;
  }>({ parcela1: 1, parcela2: 1 });

  const [isOpenModalAddPayment, setIsOpenModalAddPayment] =
    useState<boolean>(false);

  const handleSelectCreditCard = (card: ICreditCard) => {
    if (!selectedCards.card1) {
      setSelectedCards({ ...selectedCards, card1: card });
    } else if (!selectedCards.card2 && selectedCards.card1.id !== card.id) {
      setSelectedCards({ ...selectedCards, card2: card });
    }
  };

  const handleValueChange = (cardId: string, value: number) => {
    if (selectedCards.card1?.id === cardId) {
      setValues({ ...values, value1: value });
    } else if (selectedCards.card2?.id === cardId) {
      setValues({ ...values, value2: value });
    }
  };

  const handleRemoveCreditCard = (cardId: string) => {
    if (selectedCards.card1?.id === cardId) {
      setSelectedCards({ ...selectedCards, card1: null });
    } else if (selectedCards.card2?.id === cardId) {
      setSelectedCards({ ...selectedCards, card2: null });
    }
  };

  const handleParcelaChange = (cardId: string, parcela: number) => {
    if (selectedCards.card1?.id === cardId) {
      setParcelas({ ...parcelas, parcela1: parcela });
    } else if (selectedCards.card2?.id === cardId) {
      setParcelas({ ...parcelas, parcela2: parcela });
    }
  };

  const handleOpenModalPayment = () => {
    setIsOpenModalAddPayment(true);
  };

  const handleCloseModalPayment = () => {
    setIsOpenModalAddPayment(false);
  };

  const totalValue = values.value1 + values.value2;
  if (totalValue > order.total) {
    alert("A soma dos valores dos cartões excede o valor total da compra.");
    return;
  }

  return (
    <div className="flex flex-col gap-y-4 w-[600px] min-h-[500px] h-max p-6 border border-gray-700 rounded-lg overflow-hidden">
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
              onRemoveCreditCard={handleRemoveCreditCard}
              isSelected={
                selectedCards.card1?.id === card.id ||
                selectedCards.card2?.id === card.id
              }
            />
          ))
        ) : (
          <p>Não há cartões cadastrados.</p>
        )}
      </div>

      {/* <div className="w-36">
        <Input
          label="Valor cartão 1"
          value={+value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div> */}

      {selectedCards.card1 && (
        <div className="w-36">
          <Input
            label={`Valor cartão 1 (${selectedCards.card1.last4})`}
            value={values.value1}
            onChange={(e) =>
              handleValueChange(selectedCards.card1.id, +e.target.value)
            }
          />
          <SelectComponent
            placeholder="1x"
            onChange={(e) => handleParcelaChange(selectedCards.card1.id, +e)}
            options={selectParcelas}
          />
        </div>
      )}

      {selectedCards.card2 && (
        <div className="w-36">
          <Input
            label={`Valor cartão 2 (${selectedCards.card2.last4})`}
            value={values.value2}
            onChange={(e) =>
              handleValueChange(selectedCards.card2.id, +e.target.value)
            }
          />
          <SelectComponent
            placeholder="1x"
            onChange={(e) => handleParcelaChange(selectedCards.card2.id, +e)}
            options={selectParcelas}
          />
        </div>
      )}

      {/* <div className="flex gap-2 items-center">
        <p className="text-base">Parcelas:</p>
        <SelectComponent
          placeholder="1x"
          onChange={(e) => setParcela(e.toString())}
          options={selectParcelas}
        />
      </div> */}

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
