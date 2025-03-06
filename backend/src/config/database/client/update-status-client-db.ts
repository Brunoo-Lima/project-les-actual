import { prismaClient } from '../../prisma-client/prisma-client';

interface IUserStatus {
  status: boolean;
  inactiveReason?: string;
}

class UpdateStatusClientDb {
  async updateStatusClient(user_id: string, data: IUserStatus) {
    return await prismaClient.user.update({
      where: {
        id: user_id,
      },

      data: {
        status: data.status,
        inactiveReason: data.inactiveReason,
        updated_at: new Date(),
      },

      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        cpf: true,
        dateOfBirth: true,
        gender: true,
        status: true,
        inactiveReason: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { UpdateStatusClientDb };
