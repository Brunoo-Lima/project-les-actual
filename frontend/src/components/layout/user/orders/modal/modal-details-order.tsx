import { IAddress } from "@/@types/IAddress";
import { IOrder } from "@/@types/IOrder";
import { Modal } from "@/components/modal";

interface IOrderRequest {
  id: string;
  total: number;
  status: string;
  freight: number;
  discountValue?: number;
  address?: IAddress;
  items: {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    orderId: string;
    product: {
      name: string;
      image: string;
    };
  }[];

  // payments: IOrderPayment[];
  // paymentMethod: any[];
}

interface IModalDetailsOrderProps {
  order: IOrderRequest | null;
  onClose: () => void;
}
export default function ModalDetailsOrder({
  order,
  onClose,
}: IModalDetailsOrderProps) {
  if (!order) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[900px] h-[400px] p-4 rounded-lg overflow-auto">
      <Modal.Header title="Detalhes do pedido" onClick={onClose} />

      <Modal.Content className="">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 bg-zinc-800 rounded-md p-4">
            <h2 className="text-xl font-semibold">Endereço de entrega: </h2>
            {order.address?.delivery && (
              <p>
                Nome identificação de entrega:{" "}
                {order.address?.identifierDelivery}
              </p>
            )}
            <p>Nome: {order.address?.identifier}</p>
            <p>Cep: {order.address?.zipCode}</p>
            <p>Rua: {order.address?.street}</p>
            <p>Número: {order.address?.number}</p>
            <p>Bairro: {order.address?.neighborhood}</p>
            <div className="flex gap-8">
              <p>Cidade: {order.address?.city}</p>
              <p>Estado: {order.address?.state}</p>
            </div>
            <p>Tipo residência: {order.address?.typeResidence}</p>
            <p>Logradouro: {order.address?.typePublicPlace}</p>
            <p>Endereço de cobrança: {order.address?.charge ? "Sim" : "Nao"}</p>
          </div>

          <div className="flex flex-col gap-4 bg-zinc-800 rounded-md p-4">
            <h2 className="text-xl font-semibold">Pagamento</h2>

            {/* <p>Bandeira: {order.payment?.flag}</p>
            <p>Numero: {order.payment?.number}</p>
            <p>Nome impresso: {order.payment?.namePrinted}</p>
            <p>CVV: {order.payment?.cvv}</p>
            <p>Validade: {order.payment?.dateExpired}</p> */}
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
