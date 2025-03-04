import { prismaClient } from '../../prisma-client/prisma-client';

class DetailClientDb {
  async detailClient(user_id: string) {
    return await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },

      select: {
        id: true,
        name: true,
        cpf: true,
        gender: true,
        dateOfBirth: true,
        email: true,
        password: true,
        phones: true,
        creditCards: true,
        addresses: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { DetailClientDb };
