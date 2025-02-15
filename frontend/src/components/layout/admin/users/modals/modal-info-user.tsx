import { IUser } from "@/@types/IUser";
import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";

interface IModalInfoUserProps {
  onClose: () => void;
  user: IUser | null;
}

export function ModalInfoUser({ onClose, user }: IModalInfoUserProps) {
  if (!user) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[900px] h-[500px] p-4 rounded-lg ">
      <Modal.Header title="Informações do usuário" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4 h-[500px] overflow-auto container-modal">
        <div className="flex justify-between gap-4 *:text-textColor-dark *:text-base *:font-normal ">
          <div className="flex flex-col gap-4 ">
            <h2 className="text-lg text-white">Dados pessoais</h2>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>CPF: {user.cpf}</p>
            <p>Telefone: {`${user.typePhone} - ${user.phone}`}</p>
            <p>Data de nascimento: {user.dateOfBirth}</p>
            <p>Gênero: {user.gender}</p>
            <p>Status: {user.status}</p>
          </div>

          <div className="flex flex-col gap-4 ">
            <h2 className="text-lg text-white">Endereço</h2>
            {user.address.map((address) => (
              <div key={address.id}>
                <p>Nome endereço: {address.identifier}</p>
                <p>CEP: {address.zipCode}</p>
                <p>Rua: {address.street}</p>
                <p>Número: {address.number}</p>
                <p>Bairro: {address.neighborhood}</p>
                <p>Cidade: {address.city}</p>
                <p>Estado: {address.state}</p>
                <p>País: {address.country}</p>
                <p>Tipo de residência: {address.typeResidence}</p>
                <p>Tipo de logradouro: {address.typePublicPlace}</p>
              </div>
            ))}
          </div>
        </div>

        <ButtonCancel onClick={onClose} text="Fechar" className="mt-4" />
      </Modal.Content>
    </Modal.Root>
  );
}
