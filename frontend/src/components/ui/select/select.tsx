/* eslint-disable react/display-name */
import { forwardRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FieldError } from "react-hook-form";

export interface ISelect {
  value: string;
  label: string;
}

interface ISelectProps {
  label?: string;
  options: ISelect[];
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  name?: string;
  error?: FieldError;
  disabled?: boolean;
}

export const SelectComponent = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ label, options, placeholder, onChange, error, disabled }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={label}
          className="font-normal text-base text-primary-light mb-1"
        >
          {label}
        </label>
        <Select onValueChange={onChange}>
          <SelectTrigger
            disabled={disabled}
            ref={ref}
            className="border-[1px] border-background-light rounded-md p-2 w-full h-[43px] focus-visible:border-primary-dark outline-none text-base text-background-light/50 placeholder:text-background-light/50 focus:ring-0"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <small className="text-error text-sm mt-1">{error.message}</small>
        )}
      </div>
    );
  }
);
