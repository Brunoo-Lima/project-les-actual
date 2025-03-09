import { IPhone } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

//cria telefone

class CreatePhoneDb {
  async createPhone(user_id: string, phoneData: IPhone) {
    return await prismaClient.phone.create({
      data: {
        number: phoneData.number,
        type: phoneData.type,
        userId: user_id,
      },
    });
  }
}

export { CreatePhoneDb };
