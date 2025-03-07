import { ICreditCard } from '../../../types/ICreditCard';
import { prismaClient } from '../../prisma-client/prisma-client';

//Criar cartao de credito

class CreateCreditCardDb {
  async createCreditCard(user_id: string, creditCardData: ICreditCard) {
    return await prismaClient.creditCard.create({
      data: {
        number: creditCardData.number,
        dateExpired: new Date(creditCardData.dateExpired),
        cvv: creditCardData.cvv,
        namePrinted: creditCardData.namePrinted,
        flag: creditCardData.flag,
        preferential: creditCardData.preferential,
        userId: user_id,
      },
    });
  }
}

export { CreateCreditCardDb };
