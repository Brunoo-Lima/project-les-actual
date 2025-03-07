import { ICreditCard } from '../../../types/ICreditCard';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateCreditCardDb {
  async updateCreditCard(
    user_id: string,
    creditCard_id: string,
    creditCardData: Partial<ICreditCard>
  ) {
    return await prismaClient.creditCard.update({
      where: { id: creditCard_id },
      data: {
        number: creditCardData.number,
        dateExpired: creditCardData.dateExpired
          ? new Date(creditCardData.dateExpired)
          : undefined,
        cvv: creditCardData.cvv,
        namePrinted: creditCardData.namePrinted,
        flag: creditCardData.flag,
        preferential: creditCardData.preferential,
        userId: user_id,
      },
    });
  }
}

export { UpdateCreditCardDb };
