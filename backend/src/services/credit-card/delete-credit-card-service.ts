import { DeleteCreditCardDb } from '../../config/database/credit-card/delete-credit-card-db';

class DeleteCreditCardService {
  private deleteCreditCardDb: DeleteCreditCardDb;

  constructor() {
    this.deleteCreditCardDb = new DeleteCreditCardDb();
  }

  async execute(creditCard_id: string) {
    if (!creditCard_id) {
      throw new Error('ID do cartão de crédito não encontrado!');
    }

    //adicionar validação aqui

    try {
      const creditCard = await this.deleteCreditCardDb.deleteCreditCard(
        creditCard_id
      );

      return creditCard;
    } catch (error) {
      console.error(error);
    }
  }
}

export { DeleteCreditCardService };
