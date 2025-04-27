import { Decimal } from '@prisma/client/runtime/library';
import { ExchangeItem } from '../../services/order/return-product/create-return-product-service';
import { StatusOrder } from '../../config/database/order/create-order-db';
import { ORDER_STATUS } from '../../config/database/order/return-product/return-product-general';

class ReturnProductValidation {
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

  isStatusValidForRequest(
    currentStatus: string, // Status atual no banco
    newStatus: StatusOrder
  ): boolean {
    const isCurrentlyReturn = currentStatus.startsWith('DEVOLUCAO_');
    const isNewStatusReturn =
      newStatus === ORDER_STATUS.RETURN_ACCEPTED ||
      newStatus === ORDER_STATUS.RETURN_COMPLETED;

    // Se a solicitação original era uma devolução, o novo status deve ser de devolução (e vice-versa)
    return isCurrentlyReturn === isNewStatusReturn;
  }
}

export { ReturnProductValidation };
