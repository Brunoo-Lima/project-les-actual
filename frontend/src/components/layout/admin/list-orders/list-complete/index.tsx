export function ListComplete() {
  const progress = "APROVADO";
  const statusOrder = "ENTREGUE";

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
            <td>19/01/2025</td>
            <td>R$ 200,00</td>
            <td>2</td>
            <td>
              <p
                className={`w-max px-2 py-1 rounded-md ${
                  progress === "APROVADO" ? "bg-green-500" : ""
                } `}
              >
                APROVADO
              </p>
            </td>
            <td className="flex items-center gap-2">
              <p>{statusOrder}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
