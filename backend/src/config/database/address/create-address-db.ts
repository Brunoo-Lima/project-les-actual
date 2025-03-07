import { IAddress } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

class CreateAddressDb {
  async createAddress(user_id: string, address: IAddress) {
    return await prismaClient.address.create({
      data: {
        zipCode: address.zipCode,
        typeResidence: address.typeResidence,
        neighborhood: address.neighborhood,
        number: address.number,
        typePublicPlace: address.typePublicPlace,
        publicPlace: address.publicPlace,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        observation: address.observation,
        delivery: address.delivery,
        charge: address.charge,
        identifier: address.identifier,
        identifierDelivery: address.identifierDelivery,
        userId: user_id,
      },
    });
  }
}

export { CreateAddressDb };
