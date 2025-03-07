import { IAddress } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateAddressDb {
  async updateAddress(
    user_id: string,
    address_id: string,
    addressData: Partial<IAddress>
  ) {
    return await prismaClient.user.update({
      where: { id: user_id },
      data: {
        addresses: {
          updateMany: {
            where: { id: address_id },
            data: addressData,
          },
        },
      },
    });
  }
}

export { UpdateAddressDb };
