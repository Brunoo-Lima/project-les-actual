import { ReactNode, useState } from 'react';

interface IUseMultiStepFormProps<T> {
  initialValues: T;
  steps: ReactNode[];
}

export function useMultiStepForm<T>({
  initialValues,
  steps,
}: IUseMultiStepFormProps<T>) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialValues);

  const next = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const previous = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return {
    currentStep: steps[stepIndex],
    stepIndex,
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === steps.length - 1,
    next,
    previous,
  };
}
