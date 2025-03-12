import { prismaClient } from '../../prisma-client/prisma-client';

class DeleteCreditCardDb {
  async deleteCreditCard(credit_card: string) {
    return await prismaClient.creditCard.delete({
      where: { id: credit_card },
    });
  }
}

export { DeleteCreditCardDb };
