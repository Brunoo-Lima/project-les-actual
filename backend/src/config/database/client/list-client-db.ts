import { prismaClient } from '../../prisma-client/prisma-client';

class ListClientDb {
  async listClient() {
    return await prismaClient.user.findMany();
  }
}

export { ListClientDb };
