'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { ShoppingCart } from '../shopping-cart';

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
        // <Step2 />,
        // <Step3 />,
        // <Step4 />,
      ],
    });

  return (
    <section className="container mx-auto ">
      <div>{currentStep}</div>

      <form className="flex items-center justify-center mt-8">
        {!isFirstStep && (
          <button type="button" onClick={previous}>
            Anterior
          </button>
        )}
        {!isLastStep ? (
          <button type="button" onClick={next}>
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary text-background p-2 rounded-md font-semibold text-base"
          >
            Finalizar
          </button>
        )}
      </form>
    </section>
  );
}
