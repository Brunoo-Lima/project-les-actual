import { IAddress } from '@/@types/IAddress';
import { CheckIcon } from 'lucide-react';
import React from 'react';

interface IAddressCardProps {
  address: IAddress;
  selectAddress: (address: IAddress) => void;
  onSelectedAddress: (id: number) => void;
}

export function AddressCard({
  address,
  onSelectedAddress,
  selectAddress,
}: IAddressCardProps) {
  //   ${
  //     selectedAddress === address.id
  //     ? 'border-primary-dark'
  //     : 'border-primary-light'
  // }
  return (
    <div
      key={address.id}
      onClick={() => selectAddress(address)}
      className={`grid grid-cols-3 bg-background rounded-md border p-4 cursor-pointer relative`}
    >
      {/* {selectedAddress === address.id && ( */}
      <small className="absolute right-2 bottom-1 bg-primary-dark text-primary-light pl-2 pr-1 rounded-md flex justify-center items-center gap-1">
        Selecionado <CheckIcon size={16} />
      </small>
      {/* )} */}

      <div className="flex flex-col gap-1">
        <span>Identificação: {address.identifier}</span>
        <span>Rua: {address.street}</span>
        <span>CEP: {address.zipCode}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span>Número: {address.number}</span>
        <span>Bairro: {address.neighborhood}</span>
        {address.typeResidence && (
          <span>Residência: {address.typeResidence}</span>
        )}
        {address.typePublicPlace && (
          <span>Logradouro: {address.typePublicPlace}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span>Cidade: {address.city}</span>
        <span>Estado: {address.state}</span>
      </div>
    </div>
  );
}
