import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="flex gap-x-2">
        <input ref={ref} type="checkbox" id={rest.id || rest.name} {...rest} />
        {label && (
          <label
            htmlFor={rest.id || rest.name}
            className="font-normal text-base text-primary-light"
          >
            {label}
          </label>
        )}

        {error && (
          <small className="text-error text-xs mt-1">{error.message}</small>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
