import { ModalBackground } from '@/components/modal/modal-background/modal-background';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { PaymentForm } from './modal-forms/payment-form';
import { Plus } from '@phosphor-icons/react';

const payments = [
  {
    id: 1,
    flag: 'Visa',
    number: '5555-5555-5555-5555',
    cvv: '1230',
    namePrinted: 'Bruno Lima',
    dateExpired: '12/2030',
    preferential: true,
  },
];

export function Payment() {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const [isOpenModalAddPayment, setIsOpenModalAddPayment] =
    useState<boolean>(false);

  const handleOpenModalPayment = () => {
    setIsOpenModalAddPayment(true);
  };

  const handleCloseModalPayment = () => {
    setIsOpenModalAddPayment(false);
  };

  const handleSelectPayment = (id: number) => {
    setSelectedPayment(id);
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] h-[500px] p-6 border border-background-light rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold">Cartões de crédito cadastrados</h2>
      <div className="overflow-auto h-[400px] container-address-form flex flex-col gap-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            onClick={() => handleSelectPayment(payment.id)}
            className={`grid grid-cols-2 gap-x-1 bg-background rounded-md border p-4 cursor-pointer relative ${
              selectedPayment === payment.id
                ? 'border-primary-dark'
                : 'border-primary-light'
            }`}
          >
            {selectedPayment === payment.id && (
              <small className="absolute right-2 bottom-1 bg-primary-dark text-primary-light pl-2 pr-1 rounded-md flex justify-center items-center gap-1">
                Selecionado <CheckIcon size={16} />
              </small>
            )}

            <div className="flex flex-col gap-1">
              <span>Bandeira: {payment.flag}</span>
              <span>Data de validade: {payment.dateExpired}</span>
              <span>CVV: {payment.cvv}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>N° do cartão: {payment.number}</span>
              <span>Nome: {payment.namePrinted}</span>
              <span>Preferencial: {payment.preferential ? 'Sim' : 'Não'}</span>
            </div>
          </div>
        ))}
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
