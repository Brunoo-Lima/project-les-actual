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

  async execute(id: string, status: ExchangeStatus) {
    const exchange = await this.exchangeOrderDb.findExchangeRequest(id);
    if (!exchange) throw new Error('Solicitação de troca não encontrada');

    if (status === 'TROCA_AUTORIZADA') {
      // Primeiro atualiza para TROCA_AUTORIZADA
      await this.exchangeOrderDb.updateExchangeStatus(id, 'TROCA_AUTORIZADA');

      // Depois automaticamente muda para DEVOLUCAO_EM_ANDAMENTO
      const updatedExchange = await this.exchangeOrderDb.updateExchangeStatus(
        id,
        'DEVOLUCAO_EM_ANDAMENTO'
      );

      return updatedExchange;
    }

    // Para outros status (incluindo PEDIDO_DEVOLVIDO)
    const updatedExchange = await this.exchangeOrderDb.updateExchangeStatus(
      id,
      status
    );

    if (status === 'PEDIDO_DEVOLVIDO' && !exchange.couponId) {
      const items = exchange.items as unknown as ExchangeItem[];
      const couponValue = this.validationReplacement.calculateTotalValue(items);
      const couponCode = this.validationReplacement.generateCouponCode();

      const coupon = await this.exchangeOrderDb.createExchangeCoupon(
        couponCode,
        couponValue,
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        exchange.userId
      );

      await this.exchangeOrderDb.linkCouponToExchange(id, coupon.id);
    }
    return updatedExchange;
  }
}

export { UpdateReplacementService };
