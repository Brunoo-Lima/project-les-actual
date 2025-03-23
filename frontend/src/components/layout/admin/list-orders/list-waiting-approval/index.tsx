import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ListWaitingApproval() {
  const [progress, setProgress] = useState("EM PROCESSAMENTO");
  const [statusOrder, setStatusOrder] = useState<
    | "AGUARDANDO PAGAMENTO"
    | "EM TRÂNSITO"
    | "ENTREGUE"
    | "AGUARDANDO TRANSPORTE"
  >("AGUARDANDO PAGAMENTO");

  useEffect(() => {
    const time = setTimeout(() => {
      setProgress("APROVADO");
      setStatusOrder("AGUARDANDO TRANSPORTE");
    }, 3000);

    return () => clearTimeout(time);
  }, [progress]);

  const handleChangeStatus = (
    newStatus:
      | "AGUARDANDO PAGAMENTO"
      | "EM TRÂNSITO"
      | "ENTREGUE"
      | "AGUARDANDO TRANSPORTE"
  ) => {
    setStatusOrder(newStatus);
  };

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/5">Id do pedido</th>
            <th className="w-1/5">Data do pedido</th>
            <th className="w-1/5">Valor do pedido</th>
            <th className="w-40">Quantidade de itens</th>
            {/* passar pagamento ou status  */}
            <th className="w-40">Pagamento</th>
            <th className="w-40">Status do pedido</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-gray-500 h-9">
            <td>1</td>
            <td>19/02/2025</td>
            <td>R$ 500,00</td>
            <td>2</td>
            <td>
              <p
                className={`w-max px-2 py-1 rounded-md ${
                  progress === "EM PROCESSAMENTO" ? "bg-yellow-500" : ""
                } `}
              >
                {progress}
              </p>
            </td>

            <td className="flex items-center gap-2">
              <p className="w-max px-2 py-1 rounded-md">{statusOrder}</p>

              {statusOrder === "AGUARDANDO TRANSPORTE" && (
                <CheckIcon
                  size={16}
                  color="#ffffff"
                  className="rounded-full size-7 bg-primary p-1 cursor-pointer"
                  onClick={() => handleChangeStatus("EM TRÂNSITO")}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
