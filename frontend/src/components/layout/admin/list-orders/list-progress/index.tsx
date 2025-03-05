export function ListProgress() {
  const progress = "EM ANDAMENTO";

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/5">Id do pedido</th>
            <th className="w-1/5">Data do pedido</th>
            <th className="w-1/5">Valor do pedido</th>
            <th className="w-1/5">Quantidade de itens</th>
            {/* passar pagamento ou status  */}
            <th className="w-1/5">Pagamento</th>
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
                  progress === "EM ANDAMENTO" ? "bg-yellow-500" : ""
                } `}
              >
                EM ANDAMENTO
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
