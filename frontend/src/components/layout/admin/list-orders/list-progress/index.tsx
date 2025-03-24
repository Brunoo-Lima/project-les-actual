import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ListProgress() {
  const [progress, setProgress] = useState<"APROVADO" | "TROCA AUTORIZADA">(
    "APROVADO"
  );
  const [statusOrder, setStatusOrder] = useState<
    "EM TRÂNSITO" | "ENTREGUE" | "EM TROCA"
  >("EM TRÂNSITO");

  // useEffect(() => {
  //   const time = setTimeout(() => {
  //     setProgress("APROVADO");
  //     setStatusOrder("EM TRÂNSITO");
  //   }, 3000);

  //   return () => clearTimeout(time);
  // }, [progress]);

  const handleChangeStatus = (
    newStatus: "EM TRÂNSITO" | "ENTREGUE" | "EM TROCA"
  ) => {
    setStatusOrder("ENTREGUE");
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
              // className={`w-max px-2 py-1 rounded-md ${
              //   progress === "EM PROCESSAMENTO" ? "bg-yellow-500" : ""
              // } `}
              >
                APROVADO
                {/* {progress} */}
              </p>
            </td>

            <td className="flex items-center gap-2">
              <p>{statusOrder}</p>

              {statusOrder === "EM TRÂNSITO" && (
                <CheckIcon
                  size={16}
                  color="#ffffff"
                  className="rounded-full size-7 bg-primary p-1 cursor-pointer"
                  onClick={() => handleChangeStatus(statusOrder)}
                />
              )}
            </td>
          </tr>

          <tr className="border-b border-gray-500 h-9">
            <td>1</td>
            <td>02/03/2025</td>
            <td>R$ 500,00</td>
            <td>1</td>
            <td>
              <p
              // className={`w-max px-2 py-1 rounded-md ${
              //   progress === "EM PROCESSAMENTO" ? "bg-yellow-500" : ""
              // } `}
              >
                EM TROCA
                {/* {progress} */}
              </p>
            </td>

            <td className="flex items-center gap-2">
              {/* <p>{statusOrder}</p> */}
              TROCA AUTORIZADA
              {/* {statusOrder === "EM TRÂNSITO" && (
                <CheckIcon
                  size={16}
                  color="#ffffff"
                  className="rounded-full size-7 bg-primary p-1 cursor-pointer"
                  onClick={() => handleChangeStatus(statusOrder)}
                />
              )} */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
