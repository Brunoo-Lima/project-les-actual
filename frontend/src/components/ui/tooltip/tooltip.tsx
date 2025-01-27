interface ITooltipProps {
  text: string;
}

export function Tooltip({ text }: ITooltipProps) {
  return (
    <div className="absolute -top-2 left-8 bg-[#141414] border border-primary-dark px-2 rounded-md transition-opacity duration-200 pointer-events-none">
      <p className="font-light text-sm text-primary-light">{text}</p>
    </div>
  );
}
