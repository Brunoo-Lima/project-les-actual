import { IPhone } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

//cria telefone

class CreatePhoneDb {
  async createPhone(user_id: string, iphoneData: IPhone) {
    return await prismaClient.phone.create({
      data: {
        number: iphoneData.number,
        type: iphoneData.type,
        userId: user_id,
      },
    });
  }
}

export { CreatePhoneDb };
