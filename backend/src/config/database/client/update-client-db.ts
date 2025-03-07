import { IUser } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

export interface IUserUpdateProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  dateOfBirth: string;
  gender: string;
  status: boolean;
}

class UpdateClientDb {
  async updateClient(user_id: string, data: Partial<IUser>) {
    return await prismaClient.user.update({
      where: {
        id: user_id,
      },

      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        dateOfBirth: new Date(data.dateOfBirth as string),
        gender: data.gender,

        // addresses: {
        //   updateMany: data.addresses?.map((address) => ({
        //     where: {
        //       id: address.id,
        //     },
        //     data: { ...address },
        //   })),
        // },

        // phones: {
        //   updateMany: data.phones?.map((phone) => ({
        //     where: {
        //       id: phone.id,
        //     },
        //     data: { ...phone },
        //   })),
        // },
        // creditCards: {
        //   updateMany: data.creditCards?.map((creditCard) => ({
        //     where: {
        //       id: creditCard.id,
        //     },
        //     data: {
        //       ...creditCard,
        //       dateExpired: new Date(creditCard.dateExpired),
        //     },
        //   })),
        // },
      },

      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        cpf: true,
        dateOfBirth: true,
        gender: true,
        // addresses: true,
        // phones: true,
        // creditCards: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { UpdateClientDb };
