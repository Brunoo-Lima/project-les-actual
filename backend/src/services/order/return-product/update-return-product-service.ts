import { Decimal } from '@prisma/client/runtime/library';
import { CreateCouponDb } from '../../../config/database/coupons/create-coupon-db';
import { StatusOrder } from '../../../config/database/order/create-order-db';
import { ReturnProductGeneral } from '../../../config/database/order/return-product/return-product-general';
import { ReturnProductValidation } from '../../../validations/return-product/return-product-validation';

class UpdateReturnProductService {
  private returnProductGeneralDb: ReturnProductGeneral;
  private validationReplacement: ReturnProductValidation;
  private createCouponDb: CreateCouponDb;

  constructor() {
    this.returnProductGeneralDb = new ReturnProductGeneral();
    this.validationReplacement = new ReturnProductValidation();
    this.createCouponDb = new CreateCouponDb();
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
        requestType
      );

    if (!exchange.order || !exchange.order.total) {
      throw new Error('Informações do pedido incompletas para gerar cupom');
    }

    // if (
    //   requestType === 'return' &&
    //   status === 'PEDIDO_DEVOLVIDO' &&
    //   !exchange.couponId // Verifica se já não tem cupom
    // ) {
    //   try {
    //     const couponCode = `DEV-${
    //       Date.now() + Math.random().toString(36).slice(2, 8)
    //     }`;
    //     const coupon = await this.returnProductGeneralDb.createExchangeCoupon(
    //       couponCode,
    //       new Decimal(exchange.order.total.toString()),
    //       new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias de expiração
    //       exchange.userId
    //     );

    //     // Associa o cupom à solicitação
    //     await this.returnProductGeneralDb.linkCouponToExchange(id, coupon.id);
    //     console.log('Cupom criado no serviço:', coupon.code);
    //   } catch (error) {
    //     console.error('Erro ao criar cupom no serviço:', error);
    //   }
    // }

    // console.log('Total do pedido:', exchange.order.total);
    // console.log('Tipo do total:', typeof exchange.order.total);
    // console.log('UserId:', exchange.userId);

    return updatedRequest;
  }
}

export { UpdateReturnProductService };
