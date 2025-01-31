import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { Input } from '@/components/ui/input/input';
import { Select } from '@/components/ui/select/select';
import { selectFlagCard } from '@/mocks/select/select';

interface IPaymentFormProps {
  onClose: () => void;
}

export function PaymentForm({ onClose }: IPaymentFormProps) {
  return (
    <Modal.Root className="w-[600px] h-[550px] overflow-auto p-4">
      <Modal.Header title="Métodos de pagamento" onClick={onClose} />

      <Modal.Content>
        <div className="mt-8 flex flex-col gap-2">
          <Select label="Bandeira" options={selectFlagCard} />

          <Input
            label="Número do cartão"
            placeholder="Digite o número do cartão"
          />
          <Input label="Nome impresso" placeholder="Digite o nome" />

          <div className="grid grid-cols-2 gap-4">
            <Input label="CVV" placeholder="Digite o cvv" />
            <Input
              label="Data de validade"
              placeholder="Digite a data de validade"
            />
          </div>

          <Checkbox label="Preferencial" />

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="bg-primary text-background p-2 rounded-md font-semibold text-base w-60 transition duration-300 hover:bg-primary-dark"
            >
              Salvar
            </button>
            <ButtonCancel text="Limpar campos" />
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
