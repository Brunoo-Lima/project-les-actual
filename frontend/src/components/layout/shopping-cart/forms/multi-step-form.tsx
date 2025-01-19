'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { ShoppingCart } from '../shopping-cart';
import { Addresses } from './addresses';

export function MultiStepForm() {
  const { isFirstStep, currentStep, stepIndex, isLastStep, next, previous } =
    useMultiStepForm({
      initialValues: {
        name: '',
        email: '',
        address: '',
        payment: '',
      },
      steps: [
        <ShoppingCart />,
        <Addresses />,
        // <Step3 />,
        // <Step4 />,
      ],
    });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center mt-8 pb-8"
    >
      {currentStep}

      <div className="flex justify-center gap-4">
        {!isFirstStep && (
          <button
            type="button"
            onClick={previous}
            className="mt-8 bg-red-700 font-semibold text-primary-light p-2 rounded-md"
          >
            Anterior
          </button>
        )}
        {!isLastStep ? (
          <button
            type="button"
            onClick={next}
            className="mt-8 bg-primary text-background p-2 rounded-md font-semibold text-base"
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary text-background p-2 rounded-md font-semibold text-base mt-8"
          >
            Finalizar
          </button>
        )}
      </div>
    </form>
  );
}
