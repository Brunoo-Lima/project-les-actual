import { Decimal } from '@prisma/client/runtime/library';
import { CreateOrderDb } from '../../config/database/order/create-order-db';

type IPaymentMethod = {
  methodId: string;
  creditCardId?: string; // Obrigatório se método for credit_card
  couponCode?: string; // Obrigatório se método for coupon
};

class CreateOrderService {
  private createOrderDb: CreateOrderDb;

  constructor() {
    this.createOrderDb = new CreateOrderDb();
  }

  async execute(
    userId: string,
    addressId: string,
    paymentData: IPaymentMethod,
    cartId: string,
    freight: number | Decimal,
    discountValue?: number | Decimal
  ) {
    try {
      const order = await this.createOrderDb.createOrder(
        userId,
        addressId,
        paymentData,
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
