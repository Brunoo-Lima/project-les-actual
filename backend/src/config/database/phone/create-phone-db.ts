import { IPhone } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

//cria telefone

class CreatePhoneDb {
  async createPhone(user_id: string, iphoneData: IPhone) {
    return await prismaClient.user.update({
      where: { id: user_id },
      data: {
        phones: {
          createMany: {
            data: iphoneData,
          },
        },
      },
      select: {
        id: true,
        phones: true,
      },
    });
  }
}

export { CreatePhoneDb };
