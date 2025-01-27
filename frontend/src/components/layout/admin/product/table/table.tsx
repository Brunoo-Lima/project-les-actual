import { TableRow } from './table-row';

interface ITableProps {
  data: any[];
}

export function Table({ data }: ITableProps) {
  return (
    <div className="w-full">
      <table className="table-fixed w-full border-separate border-spacing-y-5">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/6 pl-2">Id</th>
            <th className="w-1/5">Nome do produto</th>
            <th className="w-1/5">Valor</th>
            <th className="w-1/5">Status</th>
            <th className="w-1/5">Estoque</th>
            <th className="w-1/12 pl-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <TableRow
              key={product.id}
              product={product}
              // onOpenDetailsClient={handleOpenDetailsClient}
              // onEditStatusClient={handleEditStatusClient}
              // onEditClient={handleEditClient}
              // onDeleteClient={handleDeleteClient}
            />
          ))}
        </tbody>
      </table>

      {/* {modalType && (
      <ModalBackground>{modalComponent[modalType]}</ModalBackground>
    )} */}
    </div>
  );
}
