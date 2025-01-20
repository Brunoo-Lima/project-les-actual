interface IInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  type = 'text',
  placeholder,
  onChange,
  value,
}: IInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-primary-light text-base">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-background p-2 rounded-md text-base"
      />
    </div>
  );
}
