import { ICreditCard } from '../../../types/ICreditCard';
import { prismaClient } from '../../prisma-client/prisma-client';

//Criar cartao de credito

class CreateCreditCardDb {
  async createCreditCard(user_id: string, creditCardData: ICreditCard) {
    return await prismaClient.user.update({
      where: { id: user_id },
      data: {
        creditCards: {
          createMany: {
            data: creditCardData,
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

export { CreateCreditCardDb };
