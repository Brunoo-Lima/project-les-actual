'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { ShoppingCart } from '../shopping-cart';
import { Addresses } from './addresses';

import { Payment } from './payment';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCheckout } from '@/hooks/useCheckout';

export function MultiStepForm() {
  const { setCart } = useCheckout();
  const router = useRouter();
  const { isFirstStep, currentStep, isLastStep, next, previous } =
    useMultiStepForm({
      steps: [
        <ShoppingCart key={0} />,
        <Addresses key={1} />,
        <Payment key={2} />,
      ],
    });

  const handleOrderFinished = async () => {
    //Logica para enviar para o backend

    toast.success('Pedido realizado com sucesso!');
    router.push('/pedidos');

    setCart([]);
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
