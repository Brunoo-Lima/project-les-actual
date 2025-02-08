import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  error?: FieldError;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label, placeholder, error, rows, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={rest.id || rest.name}
          className="font-normal text-base text-primary-light mb-1"
        >
          {label}
        </label>
        <textarea
          id={rest.id || rest.name}
          placeholder={placeholder}
          ref={ref}
          rows={rows}
          {...rest}
          className="border-[1px] border-background-light bg-background rounded-md p-2 w-full h-auto focus-visible:border-primary-dark outline-none text-base text-background-light/50 placeholder:text-background-light/50 resize-none"
        />

        {error && (
          <small className="text-error text-xs mt-1">{error.message}</small>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
