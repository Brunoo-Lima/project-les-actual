import {
  ExchangeOrderDb,
  ExchangeStatus,
} from '../../../config/database/order/exchange-order-db';
import { ReplacementValidation } from '../../../validations/replacement/replacement-validation';
import { ExchangeItem } from './create-replacement-service';

class UpdateReplacementService {
  private exchangeOrderDb: ExchangeOrderDb;
  private validationReplacement: ReplacementValidation;

  constructor() {
    this.exchangeOrderDb = new ExchangeOrderDb();
    this.validationReplacement = new ReplacementValidation();
  }

  async execute(exchangeId: string, newStatus: ExchangeStatus) {
    const exchange = await this.exchangeOrderDb.findExchangeRequest(exchangeId);
    if (!exchange) throw new Error('Solicitação de troca não encontrada');

    const updatedExchange = await this.exchangeOrderDb.updateExchangeStatus(
      exchangeId,
      newStatus
    );

    if (newStatus === 'PEDIDO_DEVOLVIDO' && !exchange.couponId) {
      const items = exchange.items as unknown as ExchangeItem[];
      const couponValue = this.validationReplacement.calculateTotalValue(items);
      const couponCode = this.validationReplacement.generateCouponCode();

      const coupon = await this.exchangeOrderDb.createExchangeCoupon(
        couponCode,
        couponValue,
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        exchange.userId
      );

      await this.exchangeOrderDb.linkCouponToExchange(exchangeId, coupon.id);
    }
    return updatedExchange;
  }
}

export { UpdateReplacementService };
