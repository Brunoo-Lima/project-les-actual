import { DeleteCreditCardDb } from '../../config/database/credit-card/delete-credit-card-db';

class DeleteCreditCardService {
  private deleteCreditCardDb: DeleteCreditCardDb;

  constructor() {
    this.deleteCreditCardDb = new DeleteCreditCardDb();
  }

  async execute(credit_card: string) {
    if (!credit_card) {
      throw new Error('ID do cartão de crédito não encontrado!');
    }

    //adicionar validação aqui

    try {
      const creditCard = await this.deleteCreditCardDb.deleteCreditCard(
        credit_card
      );

      return creditCard;
    } catch (error) {
      console.error(error);
    }
  }
}

export { DeleteCreditCardService };
