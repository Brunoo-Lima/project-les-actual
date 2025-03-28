import { prismaClient } from '../../config/prisma-client/prisma-client';
import { IAddress } from '../../types/IUser';

class AddressValidationService {
  async validateAddress(
    user_id: string,
    address: IAddress,
    address_id?: string
  ): Promise<void> {
    const userAddresses = await prismaClient.address.findMany({
      where: { userId: user_id },
    });

    const currentAddress = address_id
      ? userAddresses.find((add) => add.id === address_id)
      : null;

    const isCurrentAddressChargeOrDelivery = currentAddress
      ? currentAddress.charge || currentAddress.delivery
      : false;

    const isNewAddressChargeOrDelivery = address.charge || address.delivery;

    if (isCurrentAddressChargeOrDelivery && !isNewAddressChargeOrDelivery) {
      const hasOtherAddressChargeOrDelivery = userAddresses.some(
        (addr) => addr.charge || (addr.delivery && addr.id !== address_id)
      );

      if (hasOtherAddressChargeOrDelivery) {
        throw new Error(
          'Não é possível desativar charge/delivery deste endereço, pois não há outro endereço ativo como charge/delivery.'
        );
      }
    }

    if (isNewAddressChargeOrDelivery) {
      const existingChargeOrDeliveryAddresses = userAddresses.find(
        (add) => add.charge || (add.delivery && add.id !== address_id)
      );

      if (existingChargeOrDeliveryAddresses) {
        await prismaClient.address.update({
          where: { id: existingChargeOrDeliveryAddresses.id },
          data: {
            charge: false,
            delivery: false,
          },
        });
      }
    }
  }

  async validateZipCode(zipCode: string, user_id?: string): Promise<void> {
    const zipCodeRegex = /^\d{5}-?\d{3}$/;
    if (!zipCodeRegex.test(zipCode)) {
      throw new Error(
        'Formato de CEP inválido. Use o formato 12345-678 ou 12345678.'
      );
    }

    const normalizedZipCode = zipCode.replace('-', '');

    const isAlreadyExistsZipCode = await prismaClient.address.findFirst({
      where: {
        zipCode: normalizedZipCode,
        userId: user_id,
      },
    });

    if (isAlreadyExistsZipCode) {
      throw new Error(
        user_id
          ? 'CEP já cadastrado para o usuário atual.'
          : 'CEP já cadastrado no sistema.'
      );
    }
  }

  async canDeleteAddress(
    user_id: string,
    address_id: string
  ): Promise<boolean> {
    const addressToDelete = await prismaClient.address.findUnique({
      where: { id: address_id },
    });

    // Verifica se o endereço existe
    if (!addressToDelete) {
      throw new Error('Endereço não encontrado.');
    }

    // Verifica se o endereço pertence ao usuário
    if (addressToDelete.userId !== user_id) {
      throw new Error('Endereço não pertence ao usuário.');
    }

    if (addressToDelete.delivery || addressToDelete.charge) {
      const userAddresses = await prismaClient.address.findMany({
        where: { userId: user_id },
      });

      // Verifica se existe outro endereço com delivery ou charge como true
      const hasOtherAddressWithDeliveryOrCharge = userAddresses.some(
        (addr) => (addr.delivery || addr.charge) && addr.id !== address_id
      );

      // Se não houver outro endereço com delivery ou charge como true, não permite a exclusão
      if (!hasOtherAddressWithDeliveryOrCharge) {
        throw new Error(
          'Não é possível apagar este endereço, pois ele é o único com delivery ou charge como true.'
        );
      }
    }

    return true;
  }
}

export { AddressValidationService };
