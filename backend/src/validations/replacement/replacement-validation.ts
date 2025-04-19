import { Decimal } from '@prisma/client/runtime/library';
import { ExchangeItem } from '../../services/order/replacement/create-replacement-service';

class ReplacementValidation {
  validateExchangeItems(
    orderItems: any[],
    exchangeItems: ExchangeItem[]
  ): void {
    for (const item of exchangeItems) {
      const orderItem = orderItems.find((i) => i.productId === item.productId);
      if (!orderItem)
        throw new Error(`Produto ${item.productId} não encontrado no pedido`);
      if (orderItem.quantity < item.quantity) {
        throw new Error(
          `Quantidade para troca maior que a comprada do produto ${item.productId}`
        );
      }
    }
  }

  calculateTotalValue(items: ExchangeItem[]): Decimal {
    return items.reduce((total, item) => {
      return total.plus(new Decimal(item.price).times(item.quantity));
    }, new Decimal(0));
  }

  generateCouponCode(): string {
    return `TROCA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }
}

export { ReplacementValidation };
