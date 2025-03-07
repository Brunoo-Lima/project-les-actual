import { CreateCreditCardDb } from '../../config/database/credit-card/create-credit-card-db';
import { ICreditCard } from '../../types/ICreditCard';
import { CreditCardValidationService } from '../../validations/credit-card/credit-card-validation-service';

class CreateCreditCardService {
  private createCreditCardDb: CreateCreditCardDb;
  private validationService: CreditCardValidationService;

  constructor() {
    this.createCreditCardDb = new CreateCreditCardDb();
    this.validationService = new CreditCardValidationService();
  }

  async execute(user_id: string, creditCardData: ICreditCard) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    await this.validationService.validateCreditCard(user_id, creditCardData);

    try {
      const creditCard = await this.createCreditCardDb.createCreditCard(
        user_id,
        creditCardData
      );

      return { creditCard };
    } catch (error) {
      console.error('Erro ao criar cartão de crédito:', error);
      throw new Error('Erro ao criar cartão de crédito!');
    }
  }
}

export { CreateCreditCardService };
