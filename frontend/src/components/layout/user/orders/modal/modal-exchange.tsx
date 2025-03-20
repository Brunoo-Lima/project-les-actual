import { Modal } from "@/components/modal";

interface IModalExchangeProps {
  onClose: () => void;
  chooseItem: any;
  order: any;
}

export function ModalExchange({
  onClose,
  chooseItem,
  order,
}: IModalExchangeProps) {
  return (
    <Modal.Root className="w-[400px] h-[300px] p-2 rounded-md">
      <Modal.Header title="Trocar pedido" onClick={onClose} />

      <Modal.Content>
        {order.items.map((item) => (
          <div>{item.nome}</div>
        ))}
      </Modal.Content>
    </Modal.Root>
  );
}

