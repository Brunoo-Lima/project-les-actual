import { ICreditCard } from '@/@types/ICreditCard';
import { CheckIcon } from 'lucide-react';

interface ICreditCardProps {
  card: ICreditCard;
  onSelectCard: (card: ICreditCard) => void;
}

export function CreditCard({ card, onSelectCard }: ICreditCardProps) {
  //   ${
  //     selectedcard === card.id
  //       ? 'border-primary-dark'
  //       : 'border-primary-light'
  //  }
  return (
    <div
      key={card.id}
      onClick={() => onSelectCard(card)}
      className={`grid grid-cols-2 gap-x-1 bg-background rounded-md border p-4 cursor-pointer relative 

      `}
    >
      {/* {selectedcard === card.id && ( */}
      <small className="absolute right-2 bottom-1 bg-primary-dark text-primary-light pl-2 pr-1 rounded-md flex justify-center items-center gap-1">
        Selecionado <CheckIcon size={16} />
      </small>
      {/* )} */}

      <div className="flex flex-col gap-1">
        <span>Bandeira: {card.flag}</span>
        <span>Data de validade: {card.dateExpired}</span>
        <span>CVV: {card.cvv}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span>N° do cartão: {card.number}</span>
        <span>Nome: {card.namePrinted}</span>
        <span>Preferencial: {card.preferential ? 'Sim' : 'Não'}</span>
      </div>
    </div>
  );
}
