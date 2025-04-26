import { Decimal } from '@prisma/client/runtime/library';
import { ReturnProductGeneral } from '../../../config/database/order/return-product/return-product-general';
import { ReplacementValidation } from '../../../validations/replacement/replacement-validation';

export type ExchangeItem = {
  productId: string;
  quantity: number;
  price: Decimal | number;
};

class CreateReturnProductService {
  private returnProductGeneralDb: ReturnProductGeneral;
  private validationReplacement: ReplacementValidation;

  constructor() {
    this.returnProductGeneralDb = new ReturnProductGeneral();
    this.validationReplacement = new ReplacementValidation();
  }

  async execute(
    userId: string,
    orderId: string,
    items: ExchangeItem[],
    reason: string
  ) {
    const order = await this.returnProductGeneralDb.findOrderWithItems(
      orderId,
      userId
    );

    if (!order) throw new Error('Pedido não encontrado');

    if (order.status !== 'ENTREGUE')
      throw new Error('Só é possível devolver pedidos entregues');

    this.validationReplacement.validateExchangeItems(order.items, items);

    return await this.returnProductGeneralDb.createExchangeRequest(
      orderId,
      userId,
      JSON.stringify(items),
      reason
    );
  }
}

export { CreateReturnProductService };
