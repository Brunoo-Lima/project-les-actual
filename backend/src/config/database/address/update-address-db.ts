import { IAddress } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateAddressDb {
  async updateAddress(
    user_id: string,
    address_id: string,
    addressData: Partial<IAddress>
  ) {
    return await prismaClient.address.update({
      where: { id: address_id },
      data: {
        zipCode: addressData.zipCode,
        typeResidence: addressData.typeResidence,
        neighborhood: addressData.neighborhood,
        number: addressData.number,
        typePublicPlace: addressData.typePublicPlace,
        publicPlace: addressData.publicPlace,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        country: addressData.country,
        observation: addressData.observation,
        delivery: addressData.delivery,
        charge: addressData.charge,
        identifier: addressData.identifier,
        identifierDelivery: addressData.identifierDelivery,
        userId: user_id,
      },
    });
  }
}

export { UpdateAddressDb };
