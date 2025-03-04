import { prismaClient } from '../../prisma-client/prisma-client';

class DeleteClientDb {
  async deleteClient(user_id: string) {
    return await prismaClient.user.delete({
      where: {
        id: user_id,
      },
    });
  }
}

export { DeleteClientDb };
