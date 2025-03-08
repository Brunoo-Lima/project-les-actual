import { prismaClient } from '../../prisma-client/prisma-client';

class DeleteAddressDb {
  async deleteAddress(address_id: string, user_id?: string) {
    return await prismaClient.address.delete({
      where: { id: address_id },
    });
  }
}

export { DeleteAddressDb };
