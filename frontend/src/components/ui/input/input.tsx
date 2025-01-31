import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = 'text', placeholder, error, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={label} className="text-primary-light text-base mb-1">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={`${className} bg-background p-2 rounded-md text-base`}
          {...rest}
        />
        {error && <span className="text-sm text-error">{error.message}</span>}
      </div>
    );
  }
);
