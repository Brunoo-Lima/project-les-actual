import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICreditCard } from '../../types/ICreditCard';

class CreditCardValidationService {
  async validateCreditCard(
    user_id: string,
    creditCardData: ICreditCard
  ): Promise<void> {
    const userCreditCards = await prismaClient.creditCard.findMany({
      where: { userId: user_id },
    });

    const isNewCreditCardPreferential = creditCardData.preferential;

    if (isNewCreditCardPreferential) {
      const existingPreferentialCreditCard = userCreditCards.find(
        (card) => card.preferential
      );

      if (existingPreferentialCreditCard) {
        await prismaClient.creditCard.update({
          where: { id: existingPreferentialCreditCard.id },
          data: {
            preferential: false,
          },
        });
      } else {
        const hasExistingPreferentialCreditCard = userCreditCards.some(
          (card) => card.preferential
        );

        if (hasExistingPreferentialCreditCard) {
          throw new Error(
            'Pelo menos um cartão de crédito preferencial é obrigatório!'
          );
        }
      }
    }
  }
}

export { CreditCardValidationService };
