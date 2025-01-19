import { useState } from 'react';
import { AddressForm } from './address-form';
import { ModalBackground } from '@/components/modal/modal-background';

interface Address {
  id: number;
  identification: string;
  street: string;
  cep: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  residence?: string;
  logradouro?: string;
}

const addresses: Address[] = [
  {
    id: 1,
    identification: 'CASA',
    street: 'Vicente',
    cep: '08695-065',
    number: '100',
    neighborhood: 'Jardins',
    city: 'Suzano',
    state: 'São Paulo',
    residence: 'Casa',
    logradouro: 'Não sei',
  },
  {
    id: 2,
    identification: 'APARTAMENTO',
    street: 'Américo',
    cep: '08690-040',
    number: '200',
    neighborhood: 'Centro',
    city: 'Suzano',
    state: 'São Paulo',
  },
];

export function Addresses() {
  const [isOpenModalNewAddress, setIsOpenModalNewAddress] =
    useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handleOpenModalNewAddress = () => {
    setIsOpenModalNewAddress(true);
  };

  const handleCloseModalNewAddress = () => {
    setIsOpenModalNewAddress(false);
  };

  const handleSelectAddress = (id: number) => {
    setSelectedAddress(id);
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] h-[500px] p-6 border border-background-light rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold">Endereços cadastrados</h2>

      <div className="overflow-auto h-[400px] container-address-form flex flex-col gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => handleSelectAddress(address.id)}
            className={`grid grid-cols-3 bg-background rounded-md border p-4 cursor-pointer relative ${
              selectedAddress === address.id
                ? 'border-primary-dark'
                : 'border-primary-light'
            }`}
          >
            {selectedAddress === address.id && (
              <small className="absolute right-2 bottom-1 bg-primary-dark text-primary-light px-1 rounded-md">
                Selecionado
              </small>
            )}

            <div className="flex flex-col gap-1">
              <span>Identificação: {address.identification}</span>
              <span>Rua: {address.street}</span>
              <span>CEP: {address.cep}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Número: {address.number}</span>
              <span>Bairro: {address.neighborhood}</span>
              {address.residence && (
                <span>Residência: {address.residence}</span>
              )}
              {address.logradouro && (
                <span>Logradouro: {address.logradouro}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span>Cidade: {address.city}</span>
              <span>Estado: {address.state}</span>
            </div>
          </div>
        ))}

        {/* <div className="grid grid-cols-3 bg-background rounded-md border border-primary-dark p-2">
          <div className="flex flex-col gap-1">
            <span>Identificação: CASA</span>
            <span>Rua: Vicente</span>
            <span>CEP: 08695-065</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>Número: 100</span>
            <span>Bairro: Jardins</span>
            <span>Residência: Casa</span>
            <span>Logradouro: Não sei</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>Cidade: Suzano</span>
            <span>Estado: São Paulo</span>
          </div>
        </div>

        <div className="grid grid-cols-3 bg-background rounded-md border border-primary-dark p-2 mt-6">
          <div className="flex flex-col gap-2">
            <span>Identificação: CASA</span>
            <span>Rua: Vicente</span>
            <span>CEP: 08695-065</span>
          </div>

          <div className="flex flex-col gap-2">
            <span>Número: 100</span>
            <span>Bairro: Jardins</span>
          </div>
        </div> */}
      </div>

      <div>
        <button
          type="button"
          className="bg-primary-dark text-background p-2 rounded-md font-semibold text-base w-60"
          onClick={handleOpenModalNewAddress}
        >
          Cadastrar novo endereço
        </button>
      </div>

      {isOpenModalNewAddress && (
        <ModalBackground>
          <AddressForm onClose={handleCloseModalNewAddress} />
        </ModalBackground>
      )}
    </div>
  );
}
