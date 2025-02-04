'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { ShoppingCart } from '../shopping-cart';
import { Addresses } from './addresses';

import { Payment } from './payment';
import { useCheckout } from '@/hooks/useCheckout';
import { useRouter } from 'next/navigation';
import { OrderFinished } from '../order-finished';
import { toast } from 'sonner';

export function MultiStepForm() {
  const router = useRouter();
  //implementando o checkout que ta no hook
  // https://chatgpt.com/c/679fc216-9768-8006-9563-9743d0b14608 atualmente to usando esse chatgpt
  const { cart } = useCheckout();
  const { isFirstStep, currentStep, stepIndex, isLastStep, next, previous } =
    useMultiStepForm({
      steps: [<ShoppingCart />, <Addresses />, <Payment />, <OrderFinished />],
    });

  const handleOrderFinished = async () => {
    //Logica para enviar para o backend

    toast.success('Pedido concluído com sucesso!');
    router.push('/produtos');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 pb-8">
      {currentStep}

      <div className="flex justify-center gap-4">
        {!isFirstStep && (
          <button
            type="button"
            onClick={previous}
            className="mt-8 bg-red-700 font-semibold text-primary-light p-2 rounded-md transition duration-300 hover:bg-red-500"
          >
            Voltar
          </button>
        )}
        {!isLastStep ? (
          <button
            type="button"
            // disabled={cart.length === 0}
            onClick={next}
            className="mt-8 bg-primary text-background p-2 rounded-md font-semibold text-base transition duration-300 hover:bg-primary-dark"
          >
            Próximo
          </button>
        ) : (
          <button
            type="button"
            onClick={handleOrderFinished}
            className="bg-primary text-background p-2 rounded-md font-semibold text-base mt-8 transition duration-300 hover:bg-primary-dark"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
