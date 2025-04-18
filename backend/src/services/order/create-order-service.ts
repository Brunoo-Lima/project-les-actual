import { Decimal } from '@prisma/client/runtime/library';
import {
  CreateOrderDb,
  IPaymentMethodItem,
} from '../../config/database/order/create-order-db';

class CreateOrderService {
  private createOrderDb: CreateOrderDb;

  constructor() {
    this.createOrderDb = new CreateOrderDb();
  }

  async execute(
    userId: string,
    addressId: string,
    paymentMethods: IPaymentMethodItem[],
    cartId: string,
    freight: number | Decimal,
    discountValue?: number | Decimal
  ) {
    try {
      const order = await this.createOrderDb.createOrder(
        userId,
        addressId,
        paymentMethods,
        cartId,
        freight,
        discountValue
      );

      return order;
    } catch (error) {
      console.error('Erro ao criar pedido: ', error);
      throw new Error('Erro ao criar pedido');
    }
  }
}

export { CreateOrderService };
