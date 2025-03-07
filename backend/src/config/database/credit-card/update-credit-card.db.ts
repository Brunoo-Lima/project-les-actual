import { ICreditCard } from '../../../types/ICreditCard';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateCreditCardDb {
  async updateCreditCard(
    user_id: string,
    creditCard_id: string,
    creditCardData: Partial<ICreditCard>
  ) {
    return await prismaClient.user.update({
      where: { id: user_id },
      data: {
        creditCards: {
          updateMany: {
            where: { id: creditCard_id },
            data: creditCardData,
          },
        },
      },
    });
  }
}

export { UpdateCreditCardDb };
