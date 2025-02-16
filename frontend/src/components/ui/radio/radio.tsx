import React, { forwardRef } from "react";
import { InputHTMLAttributes } from "react";

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
}

export const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  ({ label, value, ...rest }, ref) => {
    return (
      <div className="flex gap-x-2">
        <input
          ref={ref}
          type="radio"
          id={rest.id || value}
          value={value}
          {...rest}
        />
        {label && (
          <label
            htmlFor={rest.id || value}
            className="font-normal text-base text-primary-light"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
