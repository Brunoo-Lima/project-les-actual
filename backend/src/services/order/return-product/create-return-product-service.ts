import { Decimal } from '@prisma/client/runtime/library';
import { ReturnProductGeneral } from '../../../config/database/order/return-product/return-product-general';
import { ReturnProductValidation } from '../../../validations/return-product/return-product-validation';

export type ExchangeItem = {
  productId: string;
  quantity: number;
  price: Decimal | number;
};

class CreateReturnProductService {
  private returnProductGeneralDb: ReturnProductGeneral;
  private validationReturnProduct: ReturnProductValidation;

  constructor() {
    this.returnProductGeneralDb = new ReturnProductGeneral();
    this.validationReturnProduct = new ReturnProductValidation();
  }

  async execute(
    userId: string,
    orderId: string,
    items: ExchangeItem[],
    reason: string,
    requestType: 'exchange' | 'return'
  ) {
    const order = await this.returnProductGeneralDb.findOrderWithItems(
      orderId,
      userId
    );

    if (!order) throw new Error('Pedido não encontrado');

    if (order.status !== 'ENTREGUE')
      throw new Error('Só é possível devolver pedidos entregues');

    this.validationReturnProduct.validateExchangeItems(order.items, items);

    return await this.returnProductGeneralDb.handleRequestType(
      orderId,
      userId,
      JSON.stringify(items),
      reason,
      requestType
    );
  }
}

export { CreateReturnProductService };
