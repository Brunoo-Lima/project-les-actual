import { ICreditCard } from "@/@types/ICreditCard";
import { CheckIcon, XIcon } from "lucide-react";

interface ICreditCardProps {
  card: ICreditCard;
  onSelectCreditCard: (card: ICreditCard) => void;
  onRemoveCreditCard: (id: string) => void;
  isSelected: boolean;
}

export function CreditCard({
  card,
  onSelectCreditCard,
  isSelected,
  onRemoveCreditCard,
}: ICreditCardProps) {
  return (
    <div
      key={card.id}
      onClick={() => onSelectCreditCard(card)}
      className={`grid grid-cols-2 gap-x-1 bg-background rounded-md border p-4 cursor-pointer relative 

      `}
    >
      {isSelected && (
        <>
          <small
            className={`absolute right-2 bottom-1 bg-primary-dark text-primary-light pl-2 pr-1 rounded-md flex justify-center items-center gap-1 ${
              isSelected ? "border-primary-dark" : "border-primary-light"
            }`}
          >
            Selecionado <CheckIcon size={16} />
          </small>

          <XIcon
            size={20}
            color="#ffffff"
            onClick={() => onRemoveCreditCard(card.id)}
            className="absolute top-2 right-2 cursor-pointer"
          />
        </>
      )}

      <div className="flex flex-col gap-1">
        <span>Bandeira: {card.flag}</span>
        <span>Data de validade: {card.dateExpired}</span>
        <span>CVV: {card.cvv}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span>N° do cartão: {card.number}</span>
        <span>Nome: {card.namePrinted}</span>
        <span>Preferencial: {card.preferential ? "Sim" : "Não"}</span>
      </div>
    </div>
  );
}
