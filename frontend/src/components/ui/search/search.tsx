import { forwardRef } from "react";
import { X, Search } from "lucide-react"; // Ou importe de "phosphor-react"

interface ISearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(
  (
    { value, onChange, onClear, placeholder = "Buscar...", className, ...rest },
    ref
  ) => {
    return (
      <div className={`relative flex items-center ${className}`}>
        {/* Ícone de busca */}
        <Search className="absolute left-3 text-gray-400" size={18} />

        <input
          ref={ref}
          type="text"
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border rounded-md bg-background-dark text-white focus:outline-none"
          {...rest}
        />

        {/* Botão para limpar busca */}
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
