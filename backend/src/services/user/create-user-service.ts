import { hash } from 'bcryptjs';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { IUser } from '../../types/IUser';

class CreateUserService {
  async execute({
    name,
    email,
    password,
    cpf,
    dateOfBirth,
    gender,
    addresses = [],
    phones = [],
    creditCards = [],
  }: IUser) {
    if (!email) throw new Error('Email não cadastrado!');

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) throw new Error('Usuário já existe!');

    const passwordHash = await hash(password, 8);

    try {
      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          cpf: cpf,
          dateOfBirth: new Date(dateOfBirth),
          gender: gender,
          addresses: {
            createMany: {
              data: addresses?.map((address) => ({
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
              data: phones?.map((phone) => ({
                type: phone.type,
                number: phone.number,
              })),
            },
          },
          creditCards: {
            createMany: {
              data: creditCards?.map((creditCard) => ({
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

      return { user };
    } catch (error) {
      console.log('Erro ao criar usuário', error);
      throw new Error('Erro ao criar usuário');
    }
  }
}

export { CreateUserService };
