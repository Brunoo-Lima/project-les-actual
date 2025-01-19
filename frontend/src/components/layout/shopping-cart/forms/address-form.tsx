import { Input } from '@/components/ui/input/input';

interface IAddressFormProps {
  onClose: () => void;
}

export function AddressForm({ onClose }: IAddressFormProps) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  bg-background-dark flex flex-col w-[600px] h-[550px] p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3"
      >
        X
      </button>

      <div className="mt-8 flex flex-col gap-2">
        <div>
          <Input
            label="Nome de Identificação"
            placeholder="Digite o nome de identificação"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="CEP" placeholder="Digite o CEP" />
          <Input label="Nome da rua" placeholder="Digite o nome da rua" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Número" placeholder="Digite o número" />
          <Input label="Bairro" placeholder="Digite o bairro" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Tipo de residência" placeholder="Digite a residência" />
          <Input label="Tipo de logradouro" placeholder="Digite o logradouro" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Cidade" placeholder="Digite a cidade" />
          <Input label="Estado" placeholder="Digite o estado" />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            className="bg-primary text-background p-2 rounded-md font-semibold text-base w-60"
          >
            Salvar
          </button>
          <button
            type="button"
            className="bg-red-700 font-semibold text-primary-light p-2 rounded-md w-60"
          >
            Limpar campos
          </button>
        </div>
      </div>
    </div>
  );
}
