import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { useEffect, useState } from "react";
import { PaymentForm } from "./modal-forms/payment-form";
import { Plus } from "@phosphor-icons/react";
import { CreditCard } from "../ui/credit-card";
import { useCheckout } from "@/hooks/useCheckout";
import { SelectComponent } from "@/components/ui/select/select";
import { selectParcelas } from "@/mocks/select/select";
import { Input } from "@/components/ui/input/input";
import { FormatValue } from "@/utils/format-value";
import { ICreditCard } from "@/@types/ICreditCard";
import { toast } from "sonner";
import { detailClient } from "@/services/client";

//TODO: MELHORAR ISSO CONFORME A MUDANÇA NO USECHECKOUT E BACKEND
export function Payment() {
  const { order, cards, setCards, validatePayment, setOrder, cart } =
    useCheckout();
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

  useEffect(() => {
    const fetchCreditCards = async () => {
      const userData = localStorage.getItem("@user:data");
      try {
        const parsedUserData = JSON.parse(userData as string);

        const creditCardsData = await detailClient(parsedUserData.id);

        console.log("credit", creditCardsData);

        if (creditCardsData) {
          setCards(creditCardsData.creditCards);
        }
      } catch (error) {
        console.error("Erro ao obter cartões de crédito:", error);
      }
    };

    fetchCreditCards();
  }, []);

  useEffect(() => {
    // Se apenas um cartão estiver selecionado, atribua o valor total do pedido a ele
    if (selectedCards.card1 && !selectedCards.card2) {
      setValues({ value1: order.total, value2: 0 });
    } else if (!selectedCards.card1 && selectedCards.card2) {
      setValues({ value1: 0, value2: order.total });
    }
  }, [selectedCards, order.total]);

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

  console.log("setOrder", order);

  const handleAddPayment = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      payment: [
        ...(selectedCards.card1
          ? [
              {
                methodId: "credit_card_1",
                creditCardId: selectedCards.card1.id,
                amount: selectedCards.card1.value,
                installments: parcelas.parcela1,
              },
            ]
          : []),
        ...(selectedCards.card2
          ? [
              {
                card: selectedCards.card2,
                value: values.value2,
                installments: parcelas.parcela2,
              },
            ]
          : []),
      ],
    }));

    toast.success("Pagamento adicionado ao pedido!");
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] min-h-[500px] h-max p-6 border border-gray-700 rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold">Forma de pagamento</h2>

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

      {selectedCards.card1 && (
        <div className="w-max flex items-end gap-4">
          {selectedCards.card2 && (
            <Input
              label={`Valor cartão (${selectedCards.card1.flag})`}
              value={values.value1.toString()}
              onChange={(e) =>
                handleValueChange(selectedCards!.card1!.id, +e.target.value)
              }
            />
          )}
          <SelectComponent
            placeholder="1x"
            onChange={(e) => handleParcelaChange(selectedCards!.card1!.id, +e)}
            options={selectParcelas}
          />
        </div>
      )}

      {selectedCards.card2 && (
        <div className="w-max flex items-end gap-4">
          <Input
            label={`Valor cartão (${selectedCards.card2.flag})`}
            value={values.value2.toString()}
            onChange={(e) =>
              handleValueChange(selectedCards!.card2!.id, +e.target.value)
            }
          />
          <SelectComponent
            placeholder="1x"
            onChange={(e) => handleParcelaChange(selectedCards!.card2!.id, +e)}
            options={selectParcelas}
          />
        </div>
      )}

      <div>Valor: {FormatValue(cat)}</div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="bg-primary-dark text-background p-2 rounded-md font-semibold text-base w-60 flex items-center justify-center gap-2 transition duration-300 hover:bg-primary"
          onClick={handleOpenModalPayment}
        >
          <Plus size={16} weight="bold" />
          Cadastrar novo cartão
        </button>

        <button
          className="bg-blue-600 text-white p-2 rounded-md"
          type="button"
          onClick={handleAddPayment}
        >
          Adicionar pagamento
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
