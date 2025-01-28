/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type Options = {
  value: string;
  label: string;
};

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Options[];
  error?: FieldError;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ label, options, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={rest.id || rest.name}
          className="font-normal text-base text-primary-light mb-1"
        >
          {label}
        </label>
        <select
          id={rest.id || rest.name}
          ref={ref}
          {...rest}
          className="border-[1px] border-background-light bg-background-dark rounded-md p-2 w-full h-[43px] focus-visible:border-primary-dark outline-none text-base text-background-light/50 placeholder:text-background-light/50"
        >
          <option value="">Selecione uma op&ccedil;&atilde;o</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <small className="text-error text-xs mt-1">{error.message}</small>
        )}
      </div>
    );
  }
);
