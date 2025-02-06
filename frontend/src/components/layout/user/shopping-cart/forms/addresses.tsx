import { useState } from 'react';
import { AddressForm } from './modal-forms/address-form';
import { ModalBackground } from '@/components/modal/modal-background/modal-background';
import { Plus } from '@phosphor-icons/react';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { useCheckout } from '@/hooks/useCheckout';
import { AddressCard } from '../ui/address-card';

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

// const addresses: Address[] = [
//   {
//     id: 1,
//     identification: 'CASA',
//     street: 'Vicente',
//     cep: '08695-065',
//     number: '100',
//     neighborhood: 'Jardins',
//     city: 'Suzano',
//     state: 'São Paulo',
//     residence: 'Casa',
//     logradouro: 'Não sei',
//   },
//   {
//     id: 2,
//     identification: 'APARTAMENTO',
//     street: 'Américo',
//     cep: '08690-040',
//     number: '200',
//     neighborhood: 'Centro',
//     city: 'Suzano',
//     state: 'São Paulo',
//   },
// ];

export function Addresses() {
  const { addresses, handleSelectAddress, selectedAddress } = useCheckout();
  const [isOpenModalNewAddress, setIsOpenModalNewAddress] =
    useState<boolean>(false);

  const handleOpenModalNewAddress = () => {
    setIsOpenModalNewAddress(true);
  };

  const handleCloseModalNewAddress = () => {
    setIsOpenModalNewAddress(false);
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] h-[500px] p-6 border border-background-light rounded-lg overflow-hidden">
      <h2 className="text-lg font-bold">Endereços cadastrados</h2>

      <div className="overflow-auto h-[400px] container-address-form flex flex-col gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isSelected={selectedAddress?.id === address.id}
              onSelectedAddress={handleSelectAddress}
            />
          ))
        ) : (
          <p>Não há endereços cadastrados!</p>
        )}
      </div>

      <div>
        <ButtonGeneral
          icon={<Plus size={16} weight="bold" />}
          text="Cadastrar novo endereço"
          onClick={handleOpenModalNewAddress}
          className="w-64"
        />
      </div>

      {isOpenModalNewAddress && (
        <ModalBackground>
          <AddressForm onClose={handleCloseModalNewAddress} />
        </ModalBackground>
      )}
    </div>
  );
}
