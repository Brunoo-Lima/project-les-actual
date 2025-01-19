interface IButtonsQuantityProps {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export function ButtonsQuantity({
  quantity,
  handleIncrement,
  handleDecrement,
}: IButtonsQuantityProps) {
  return (
    <div className="flex items-center justify-between w-24">
      <button
        className="w-8 h-8 border border-gray-300 rounded-md"
        onClick={handleDecrement}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="w-8 h-8 border border-gray-300 rounded-md"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
