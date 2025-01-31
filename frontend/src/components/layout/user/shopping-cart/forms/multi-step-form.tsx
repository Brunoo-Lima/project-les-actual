'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { ShoppingCart } from '../shopping-cart';
import { Addresses } from './addresses';
import { FormProvider, useForm } from 'react-hook-form';
import { Payment } from './payment';

export function MultiStepForm() {
  const methods = useForm({
    // defaultValues: {
    //   name: '',
    //   email: '',
    //   address: '',
    //   payment: '',
    // },
  });

  const { isFirstStep, currentStep, stepIndex, isLastStep, next, previous } =
    useMultiStepForm({
      initialValues: {
        name: '',
        email: '',
        address: '',
        payment: '',
      },
      steps: [<ShoppingCart />, <Addresses />, <Payment />],
    });

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
    if (!isLastStep) {
      next();
    } else {
      // Finalizar ou enviar os dados
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center mt-8 pb-8"
      >
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
              onClick={next}
              className="mt-8 bg-primary text-background p-2 rounded-md font-semibold text-base transition duration-300 hover:bg-primary-dark"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary text-background p-2 rounded-md font-semibold text-base mt-8 transition duration-300 hover:bg-primary-dark"
            >
              Finalizar
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
