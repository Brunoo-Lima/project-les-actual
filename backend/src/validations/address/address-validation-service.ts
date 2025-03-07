import { prismaClient } from '../../config/prisma-client/prisma-client';
import { IAddress } from '../../types/IUser';

class AddressValidationService {
  async validateAddress(user_id: string, address: IAddress): Promise<void> {
    const userAddresses = await prismaClient.address.findMany({
      where: { userId: user_id },
    });

    const isNewAddressChargeOrDelivery = address.charge || address.delivery;

    if (isNewAddressChargeOrDelivery) {
      const existingChargeOrDeliveryAddresses = userAddresses.find(
        (add) => add.charge || add.delivery
      );

      if (existingChargeOrDeliveryAddresses) {
        await prismaClient.address.update({
          where: { id: existingChargeOrDeliveryAddresses.id },
          data: {
            charge: false,
            delivery: false,
          },
        });
      } else {
        const hasExistingChargeOrDelivery = userAddresses.some(
          (addr) => addr.charge || addr.delivery
        );

        if (!hasExistingChargeOrDelivery) {
          throw new Error(
            'Pelo menos um endereço de entrega ou de cobrança é obrigatório!'
          );
        }
      }
    }
  }
}

export { AddressValidationService };
