interface IInputProps {
  label: string;
  type?: string;
  placeholder: string;
}

export function Input({ label, type = 'text', placeholder }: IInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-primary-light text-base">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-background p-2 rounded-md text-base"
      />
    </div>
  );
}
