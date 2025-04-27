import { StatusOrder } from '../../../config/database/order/create-order-db';
import {
  ORDER_STATUS,
  ReturnProductGeneral,
} from '../../../config/database/order/return-product/return-product-general';
import { ReturnProductValidation } from '../../../validations/return-product/return-product-validation';

import { ExchangeItem } from './create-return-product-service';

class UpdateReturnProductService {
  private returnProductGeneralDb: ReturnProductGeneral;
  private validationReplacement: ReturnProductValidation;

  constructor() {
    this.returnProductGeneralDb = new ReturnProductGeneral();
    this.validationReplacement = new ReturnProductValidation();
  }

  private shouldCreateCoupon(status: StatusOrder, hasCoupon: boolean): boolean {
    const isReturn =
      status === ORDER_STATUS.RETURN_ACCEPTED ||
      status === ORDER_STATUS.RETURN_COMPLETED;

    return isReturn && !hasCoupon;
  }

  async execute(
    id: string,
    status: StatusOrder,
    requestType: 'exchange' | 'return'
  ) {
    const exchange = await this.returnProductGeneralDb.findExchangeRequest(id);

    if (!exchange) {
      throw new Error('Solicitação não encontrada');
    }

    if (
      (requestType === 'return' && !status.startsWith('DEVOLUCAO_')) ||
      (requestType === 'exchange' && !status.startsWith('TROCA_'))
    ) {
      throw new Error(`Status ${status} inválido para ${requestType}`);
    }

    // Atualização única do status
    const updatedRequest =
      await this.returnProductGeneralDb.updateExchangeStatus(
        id,
        status,
        requestType // Passando o tipo para a camada de banco
      );

    // Lógica de cupom separada e mais clara
    // if (this.shouldCreateCoupon(status, !!exchange.couponId)) {
    //   const items = exchange.items as unknown as ExchangeItem[];
    //   const couponValue = this.validationReplacement.calculateTotalValue(items);
    //   const couponCode = this.validationReplacement.generateCouponCode();

    //   const coupon = await this.returnProductGeneralDb.createExchangeCoupon(
    //     couponCode,
    //     couponValue,
    //     new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    //     exchange.userId
    //   );

    //   await this.returnProductGeneralDb.linkCouponToExchange(id, coupon.id);
    // }

    return updatedRequest;
  }
}

export { UpdateReturnProductService };
