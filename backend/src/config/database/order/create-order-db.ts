import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../../prisma-client/prisma-client';
import { Prisma } from '@prisma/client';

export type IPaymentMethodItem = {
  methodId: string;
  amount?: number | Decimal; // Valor parcial para este método (opcional)
  creditCardId?: string; // Obrigatório se método for credit_card
  couponCode?: string; // Obrigatório se método for coupon
  installments?: number;
};

class CreateOrderDb {
  async createOrder(
    userId: string,
    addressId: string,
    paymentMethods: IPaymentMethodItem[],
    cartId: string,
    freight: number | Decimal,
    discountValue?: number | Decimal
  ) {
    return await prismaClient.$transaction(async (prisma) => {
      const cart = await prisma.cart.findUnique({
        where: {
          id: cartId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart) throw new Error('Carrinho não encontrado');
      if (cart.userId !== userId)
        throw new Error('Carrinho não pertence ao usuário');
      if (cart.items.length === 0) throw new Error('Carrinho vazio');

      const address = await prisma.address.findFirst({
        where: {
          id: addressId,
          userId,
        },
      });

      if (!address) throw new Error('Endereço inválido');

      const itemsTotal = cart.items.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
      );

      const discount = discountValue ? Number(discountValue) : 0;
      const totalValue = itemsTotal + Number(freight) - discount;

      // Validar métodos de pagamento
      let totalPaymentAmount = 0;
      const couponCodes = new Set<string>();
      let exchangeCouponId: string | undefined;

      for (const payment of paymentMethods) {
        const paymentMethod = await prisma.paymentMethod.findUnique({
          where: { id: payment.methodId },
        });

        if (!paymentMethod)
          throw new Error(`Método de pagamento ${payment.methodId} inválido`);

        // Validações específicas por tipo
        if (paymentMethod.type === 'credit_card' && !payment.creditCardId) {
          throw new Error('Pagamento com cartão requer ID do cartão');
        }

        if (paymentMethod.type === 'coupon') {
          if (!payment.couponCode)
            throw new Error('Pagamento com cupom requer código do cupom');

          // Verificar se cupom já foi usado nesta transação
          if (couponCodes.has(payment.couponCode)) {
            throw new Error('Cupom já utilizado nesta transação');
          }
          couponCodes.add(payment.couponCode);

          const coupon = await prisma.exchangeCoupon.findUnique({
            where: {
              code: payment.couponCode,
              status: 'active',
              isUsed: false,
            },
          });

          if (!coupon)
            throw new Error(
              `Cupom ${payment.couponCode} inválido ou já utilizado`
            );
          exchangeCouponId = coupon.id;
        }

        // Soma os valores parciais ou assume divisão igual posteriormente
        totalPaymentAmount += payment.amount ? Number(payment.amount) : 0;
      }

      // Verificar se a soma dos pagamentos bate com o total
      if (
        totalPaymentAmount > 0 &&
        Math.abs(totalPaymentAmount - totalValue) > 0.01
      ) {
        throw new Error(
          'A soma dos valores de pagamento não corresponde ao total do pedido'
        );
      }

      // Criar o pedido
      const order = await prisma.order.create({
        data: {
          userId,
          total: new Decimal(totalValue),
          status: 'Pendente',
          freight: new Decimal(Number(freight)),
          discountValue: discountValue ? new Decimal(discount) : null,
          addressId,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price as any,
            })) as Prisma.OrderItemUncheckedCreateWithoutOrderInput[],
          },
          payments: {
            createMany: {
              data: paymentMethods.map((payment) => {
                const paymentAmount = payment.amount
                  ? new Decimal(Number(payment.amount))
                  : new Decimal(totalValue / paymentMethods.length); // Divide igualmente se não especificado

                const installments = payment.installments || 1;
                const installmentValue = new Decimal(
                  paymentAmount.toNumber() / installments
                );

                return {
                  paymentMethodId: payment.methodId,
                  amount: paymentAmount,
                  status: 'pending',
                  creditCardId: payment.creditCardId || null,
                  exchangeCouponId: payment.couponCode
                    ? exchangeCouponId
                    : null,
                  installments: installments,
                  installmentValue: installmentValue,
                };
              }),
            },
          },
        },
        include: {
          items: true,
          payments: true,
        },
      });

      // Marcar cupons como usados
      for (const payment of paymentMethods) {
        if (payment.couponCode) {
          await prisma.exchangeCoupon.updateMany({
            where: { code: payment.couponCode },
            data: { isUsed: true },
          });
        }
      }

      // Limpar o carrinho
      await prisma.cartItem.deleteMany({ where: { cartId } });

      return order;
    });
  }
}

export { CreateOrderDb };
