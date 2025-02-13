interface InputChatbotProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

export const InputChatbot = ({
  onChange,
  placeholder,
  value,
  onKeyDown,
  ...rest
}: InputChatbotProps) => {
  return (
    <input
      className="rounded-[1.5625rem] w-[267px] h-[45px] p-2 bg-white text-black text-base border-[1px] border-primary-dark focus-visible:border-primary-dark outline-none ps-3"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
};
