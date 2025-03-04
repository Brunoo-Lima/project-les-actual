import { IUser } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

class CreateClientDb {
  async createClient({
    name,
    email,
    password,
    cpf,
    dateOfBirth,
    gender,
    addresses,
    phones,
    creditCards,
  }: IUser) {
    return await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        cpf,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        addresses: {
          createMany: {
            data: addresses.map((address) => ({
              zipCode: address.zipCode,
              street: address.street,
              number: address.number,
              neighborhood: address.neighborhood,
              typePublicPlace: address.typePublicPlace,
              typeResidence: address.typeResidence,
              city: address.city,
              state: address.state,
              country: address.country,
              observation: address.observation,
              delivery: address.delivery,
              charge: address.charge,
              identifier: address.identifier,
              identifierDelivery: address.identifierDelivery,
            })),
          },
        },
        phones: {
          createMany: {
            data: phones.map((phone) => ({
              type: phone.type,
              number: phone.number,
            })),
          },
        },
        creditCards: {
          createMany: {
            data: creditCards.map((creditCard) => ({
              flag: creditCard.flag,
              namePrinted: creditCard.namePrinted,
              number: creditCard.number,
              cvv: creditCard.cvv,
              preferential: creditCard.preferential,
              dateExpired: new Date(creditCard.dateExpired),
            })),
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        cpf: true,
        dateOfBirth: true,
        gender: true,
        addresses: true,
        phones: true,
        creditCards: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { CreateClientDb };
