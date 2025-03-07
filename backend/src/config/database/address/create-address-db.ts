import { IAddress } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

//Criar endereço

//melhorar pois nao ta correto ainda, objeto ta estranho

class CreateAddressDb {
  async createAddress(user_id: string, addressData: { addresses: IAddress[] }) {
    return await prismaClient.user.update({
      where: { id: user_id },
      data: {
        addresses: {
          createMany: {
            data: addressData.addresses,
          },
        },
      },
      select: {
        id: true,
        addresses: true,
      },
    });
  }
}

export { CreateAddressDb };
