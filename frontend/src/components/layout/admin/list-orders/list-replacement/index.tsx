import { CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

export function ListReplacement() {
  const handleAcceptOrderExchange = () => {
    toast.success("Pedido de troca aprovado!");
  };

  const handleRefusedOrderExchange = () => {
    toast.success("Pedido de troca recusado!");
  };

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/5">Id do pedido</th>
            <th className="w-1/5">Data do pedido</th>
            <th className="w-1/5">Valor do pedido</th>
            <th className="w-1/5">Quantidade de itens</th>
            <th className="w-1/12 pl-4">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-gray-500 h-9">
            <td>1</td>
            <td>02/02/2025</td>
            <td>R$ 300,00</td>
            <td>2</td>
            <td className="flex gap-2 ml-2 items-center">
              <button
                type="button"
                onClick={handleAcceptOrderExchange}
                className="size-7 rounded-full bg-green-500 p-1 flex items-center justify-center"
              >
                <CheckIcon size={16} color="#ffffff" />
              </button>

              <button
                type="button"
                onClick={handleRefusedOrderExchange}
                className="size-7 rounded-full bg-error p-1 flex items-center justify-center"
              >
                <XIcon size={16} color="#ffffff" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

