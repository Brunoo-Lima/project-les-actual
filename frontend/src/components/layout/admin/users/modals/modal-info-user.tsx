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
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[500px] p-4 rounded-lg ">
      <Modal.Header title="Informações do usuário" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4 h-[500px] overflow-auto container-modal">
        <div className="flex flex-col gap-4 *:text-textColor-dark *:text-base *:font-normal ">
          <div className="flex flex-col gap-4 ">
            <h2 className="text-lg text-white">Dados pessoais</h2>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Senha: {user.password}</p>
            <p>CPF: {user.cpf}</p>
            <p>Data de nascimento: {user.dateOfBirth}</p>
            <p>Gênero: {user.gender}</p>
            <p>Status: {user.status ? "Ativo" : "Inativo"}</p>
            <p>Telefones: </p>
            <div className="flex flex-col gap-4">
              {user.phones?.map((phone, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 border border-gray-500 rounded-md p-4"
                >
                  <h4>Telefone {index + 1}:</h4>
                  <p className="text-textColor-dark text-base font-normal ">
                    {phone.type} - {phone.number}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <h2 className="text-lg text-white">Endereço</h2>
            {user.addresses?.map((address, index) => (
              <div
                key={address.id}
                className="flex flex-col gap-4 border border-gray-500 rounded-md p-4"
              >
                <h4>Endereço {index + 1}:</h4>
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
                <p>Endereço de cobrança: {address.charge ? "Sim" : "Nao"}</p>
                <p>Endereço de entrega: {address.delivery ? "Sim" : "Nao"}</p>

                {address.delivery && (
                  <p>
                    Nome do endereço de entrega:{address.identifierDelivery}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 ">
            <h2 className="text-lg text-white">Cartões</h2>
            {user.creditCards?.map((creditCard, index) => (
              <div
                key={creditCard.id}
                className="flex flex-col gap-4 border border-gray-500 rounded-md p-4"
              >
                <h4>Cartão {index + 1}:</h4>
                <p>Bandeira: {creditCard.flag}</p>
                <p>Número: {creditCard.number}</p>
                <p>Nome: {creditCard.namePrinted}</p>
                <p>Cvv: {creditCard.cvv}</p>
                <p>Validade: {creditCard.dateExpired}</p>
                <p>Preferencial: {creditCard.preferential ? "Sim" : "Nao"}</p>
              </div>
            ))}
          </div>
        </div>

        <ButtonCancel onClick={onClose} text="Fechar" className="mt-4" />
      </Modal.Content>
    </Modal.Root>
  );
}
