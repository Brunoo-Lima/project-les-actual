import { IPhone } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdatePhoneDb {
  async updatePhone(
    user_id: string,
    phone_id: string,
    iphoneData: Partial<IPhone>
  ) {
    return await prismaClient.user.update({
      where: { id: user_id },
      data: {
        phones: {
          updateMany: {
            where: { id: phone_id },
            data: iphoneData,
          },
        },
      },
    });
  }
}

export { UpdatePhoneDb };
