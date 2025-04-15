interface IButtonsQuantityProps {
  quantity: number;
  stock: {
    reserved: number;
    quantity: number;
  };
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export function ButtonsQuantity({
  quantity,
  handleIncrement,
  handleDecrement,
  stock,
}: IButtonsQuantityProps) {
  const handleIncrementValidationQuantity = () => {
    // if (quantity < stock.quantity - stock.reserved) {
    handleIncrement();
    // }
  };

  return (
    <div className="flex items-center justify-between w-24">
      <button
        type="button"
        className="w-8 h-8 border border-gray-300 rounded-md transition duration-300 hover:bg-gray-700"
        onClick={handleDecrement}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        className="w-8 h-8 border border-gray-300 rounded-md transition duration-300 hover:bg-gray-700"
        onClick={handleIncrementValidationQuantity}
      >
        +
      </button>
    </div>
  );
}
