import { useEffect, useState } from "react";
import { ModalBackground } from "@/components/modal/modal-background/modal-background";
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
import { IPaymentMethodItem } from "@/@types/IOrder";

export function Payment() {
  const {
    order,
    cards,
    setCards,
    validatePayment,
    setOrder,
    cart,
    handleSelectCreditCard: contextSelectCreditCard,
    handleRemoveCreditCardFromOrder,
  } = useCheckout();

  const [selectedCards, setSelectedCards] = useState<ICreditCard[]>([]);
  const [paymentValues, setPaymentValues] = useState<Record<string, number>>(
    {}
  );
  const [installments, setInstallments] = useState<Record<string, number>>({});
  const [isOpenModalAddPayment, setIsOpenModalAddPayment] = useState(false);

  useEffect(() => {
    const fetchCreditCards = async () => {
      const userData = localStorage.getItem("@user:data");
      if (!userData) return;

      try {
        const parsedUserData = JSON.parse(userData);
        const creditCardsData = await detailClient(parsedUserData.id);

        if (creditCardsData?.creditCards) {
          setCards(creditCardsData.creditCards);
        }
      } catch (error) {
        console.error("Erro ao obter cartões de crédito:", error);
        toast.error("Erro ao carregar cartões de crédito");
      }
    };

    fetchCreditCards();
  }, []);

  // Inicializa valores quando cartões são selecionados
  useEffect(() => {
    if (selectedCards.length === 1 && !paymentValues[selectedCards[0].id]) {
      setPaymentValues({
        [selectedCards[0].id]: order.total,
      });
      setInstallments({
        [selectedCards[0].id]: 1,
      });
    }
  }, [selectedCards, order.total]);

  const handleSelectCreditCard = (card: ICreditCard) => {
    // Não permite selecionar mais de 2 cartões
    if (selectedCards.length >= 2) {
      toast.info("Máximo de 2 cartões permitidos");
      return;
    }

    // Verifica se o cartão já foi selecionado
    if (!selectedCards.some((c) => c.id === card.id)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleRemoveCreditCard = (cardId: string) => {
    setSelectedCards(selectedCards.filter((card) => card.id !== cardId));

    // Remove os valores associados ao cartão
    const newValues = { ...paymentValues };
    delete newValues[cardId];
    setPaymentValues(newValues);

    const newInstallments = { ...installments };
    delete newInstallments[cardId];
    setInstallments(newInstallments);

    // Remove do contexto também
    handleRemoveCreditCardFromOrder(cardId);
  };

  const handleValueChange = (cardId: string, value: number) => {
    setPaymentValues({
      ...paymentValues,
      [cardId]: value,
    });
  };

  const handleParcelaChange = (cardId: string, parcela: number) => {
    setInstallments({
      ...installments,
      [cardId]: parcela,
    });
  };

  const calculateRemainingValue = () => {
    const totalPaid = Object.values(paymentValues).reduce(
      (sum, value) => sum + value,
      0
    );
    return Math.max(0, order.total - totalPaid);
  };

  const handleAddPayment = () => {
    const paymentMethods: IPaymentMethodItem[] = selectedCards.map((card) => ({
      methodId: "credit_card_1", // Ou obtenha do seu sistema de métodos
      creditCardId: card.id,
      amount: paymentValues[card.id] || 0,
      installments: installments[card.id] || 1,
    }));

    // Verifica se a soma dos valores está correta
    const totalPaid = paymentMethods.reduce(
      (sum, pm) => sum + (pm.amount || 0),
      0
    );
    if (Math.abs(totalPaid - order.total) > 0.01) {
      toast.error(
        `A soma dos valores (${FormatValue(
          totalPaid
        )}) não corresponde ao total do pedido (${FormatValue(order.total)})`
      );
      return;
    }

    // Atualiza o pedido no contexto
    setOrder((prev) => ({
      ...prev,
      payment: paymentMethods,
    }));

    toast.success("Pagamento adicionado ao pedido!");
  };

  const handleOpenModalPayment = () => setIsOpenModalAddPayment(true);
  const handleCloseModalPayment = () => setIsOpenModalAddPayment(false);

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
              isSelected={selectedCards.some((c) => c.id === card.id)}
            />
          ))
        ) : (
          <p>Não há cartões cadastrados.</p>
        )}
      </div>

      {selectedCards.map((card, index) => (
        <div key={card.id} className="w-full flex items-end gap-4">
          {selectedCards.length > 1 && (
            <Input
              label={`Valor cartão (${card.flag})`}
              type="number"
              min="0"
              max={order.total}
              value={paymentValues[card.id]?.toString() || ""}
              onChange={(e) => handleValueChange(card.id, +e.target.value)}
            />
          )}
          <div className="flex-1">
            <SelectComponent
              label="Parcelas"
              placeholder="1x"
              value={installments[card.id]?.toString() || "1"}
              onChange={(value) => handleParcelaChange(card.id, +value)}
              options={selectParcelas}
            />
          </div>
        </div>
      ))}

      {selectedCards.length > 1 && (
        <div className="text-sm text-gray-600">
          Valor restante: {FormatValue(calculateRemainingValue())}
        </div>
      )}

      <div className="font-semibold">Total: {FormatValue(order.total)}</div>

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
          className="bg-blue-600 text-white p-2 rounded-md disabled:opacity-50"
          type="button"
          onClick={handleAddPayment}
          disabled={selectedCards.length === 0}
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
