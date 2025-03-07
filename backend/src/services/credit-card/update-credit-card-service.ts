import { UpdateCreditCardDb } from '../../config/database/credit-card/update-credit-card.db';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICreditCard } from '../../types/ICreditCard';
import { CreditCardValidationService } from '../../validations/credit-card/credit-card-validation-service';

class UpdateCreditCardService {
  private updateCreditCardDb: UpdateCreditCardDb;
  private validationService: CreditCardValidationService;

  constructor() {
    this.updateCreditCardDb = new UpdateCreditCardDb();
    this.validationService = new CreditCardValidationService();
  }

  async execute(
    user_id: string,
    creditCard_id: string,
    creditCardData: Partial<ICreditCard>
  ) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    if (!creditCard_id) {
      throw new Error('ID do cartão de crédito é obrigatório');
    }

    const creditCard = await prismaClient.creditCard.findFirst({
      where: {
        id: creditCard_id,
        userId: user_id,
      },
    });

    if (!creditCard) {
      throw new Error(
        'Cartão de crédito não encontrado para o usuário especificado.'
      );
    }

    await this.validationService.validateCreditCard(
      user_id,
      creditCardData as ICreditCard
    );

    try {
      const creditCard = await this.updateCreditCardDb.updateCreditCard(
        user_id,
        creditCard_id,
        creditCardData
      );

      return { creditCard };
    } catch (error) {
      console.error('Erro ao atualizar cartão de crédito:', error);
      throw new Error('Erro ao atualizar cartão de crédito!');
    }
  }
}

export { UpdateCreditCardService };
