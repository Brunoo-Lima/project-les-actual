import { StatusOrder } from '../../../config/database/order/create-order-db';
import { ReturnProductGeneral } from '../../../config/database/order/return-product/return-product-general';
import { ReplacementValidation } from '../../../validations/replacement/replacement-validation';
import { ExchangeItem } from './create-return-product-service';

class UpdateReturnProductService {
  private returnProductGeneralDb: ReturnProductGeneral;
  private validationReplacement: ReplacementValidation;

  constructor() {
    this.returnProductGeneralDb = new ReturnProductGeneral();
    this.validationReplacement = new ReplacementValidation();
  }

  async execute(id: string, status: StatusOrder) {
    const exchange = await this.returnProductGeneralDb.findExchangeRequest(id);
    if (!exchange) throw new Error('Solicitação de devolução não encontrada');

    if (status === 'DEVOLUCAO_ACEITA') {
      const updatedExchange =
        await this.returnProductGeneralDb.updateExchangeStatus(
          id,
          'DEVOLUCAO_EM_ANDAMENTO'
        );
      return updatedExchange;
    }

    // Para outros status (incluindo PEDIDO_DEVOLVIDO)
    const updatedExchange =
      await this.returnProductGeneralDb.updateExchangeStatus(id, status);

    if (status === 'PEDIDO_DEVOLVIDO' && !exchange.couponId) {
      const items = exchange.items as unknown as ExchangeItem[];
      const couponValue = this.validationReplacement.calculateTotalValue(items);
      const couponCode = this.validationReplacement.generateCouponCode();

      const coupon = await this.returnProductGeneralDb.createExchangeCoupon(
        couponCode,
        couponValue,
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        exchange.userId
      );

      await this.returnProductGeneralDb.linkCouponToExchange(id, coupon.id);
    }
    return updatedExchange;
  }
}

export { UpdateReturnProductService };
