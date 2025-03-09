import { IPhone } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdatePhoneDb {
  async updatePhone(
    user_id: string,
    phone_id: string,
    phoneData: Partial<IPhone>
  ) {
    return await prismaClient.phone.update({
      where: { id: phone_id },
      data: {
        number: phoneData.number || undefined,
        type: phoneData.type,
        userId: user_id,
      },
    });
  }
}

export { UpdatePhoneDb };
