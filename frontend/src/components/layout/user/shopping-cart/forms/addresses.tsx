import { useEffect, useState } from "react";
import { AddressForm } from "./modal-forms/address-form";
import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { Plus } from "@phosphor-icons/react";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { useCheckout } from "@/hooks/useCheckout";
import { AddressCard } from "../ui/address-card";
import { detailClient } from "@/services/client";

export function Addresses() {
  const { addresses, setAddresses, handleSelectAddress, selectedAddress } =
    useCheckout();
  const [isOpenModalNewAddress, setIsOpenModalNewAddress] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const userData = localStorage.getItem("@user:data");
      try {
        const parsedUserData = JSON.parse(userData as string);

        const addressesData = await detailClient(parsedUserData.id);

        console.log("addressesData", addressesData);

        if (addressesData) {
          setAddresses(addressesData.addresses);
        }
      } catch (error) {
        console.error("Erro ao obter endereços:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleOpenModalNewAddress = () => {
    setIsOpenModalNewAddress(true);
  };

  const handleCloseModalNewAddress = () => {
    setIsOpenModalNewAddress(false);
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] h-[500px] p-6 border border-gray-700 rounded-lg overflow-hidden">
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
