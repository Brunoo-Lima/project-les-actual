import { prismaClient } from '../../prisma-client/prisma-client';

class DeletePhoneDb {
  async deletePhone(phone_id: string) {
    return await prismaClient.phone.delete({
      where: { id: phone_id },
    });
  }
}

export { DeletePhoneDb };
