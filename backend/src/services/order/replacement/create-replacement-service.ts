import { Decimal } from '@prisma/client/runtime/library';
import { ExchangeOrderDb } from '../../../config/database/order/exchange-order-db';
import { ReplacementValidation } from '../../../validations/replacement/replacement-validation';

export type ExchangeItem = {
  productId: string;
  quantity: number;
  price: Decimal | number;
};

class CreateReplacementService {
  private exchangeOrderDb: ExchangeOrderDb;
  private validationReplacement: ReplacementValidation;

  constructor() {
    this.exchangeOrderDb = new ExchangeOrderDb();
    this.validationReplacement = new ReplacementValidation();
  }

  async execute(
    userId: string,
    orderId: string,
    items: ExchangeItem[],
    reason: string
  ) {
    const order = await this.exchangeOrderDb.findOrderWithItems(
      orderId,
      userId
    );

    if (!order) throw new Error('Pedido não encontrado');

    if (order.status !== 'ENTREGUE')
      throw new Error('Só é possível trocar pedidos entregues');

    this.validationReplacement.validateExchangeItems(order.items, items);

    return await this.exchangeOrderDb.createExchangeRequest(
      orderId,
      userId,
      JSON.stringify(items),
      reason
    );
  }
}

export { CreateReplacementService };
