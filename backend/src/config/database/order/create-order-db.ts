import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../../prisma-client/prisma-client';
import { Prisma } from '@prisma/client';

class CreateOrderDb {
  async createOrder(
    userId: string,
    addressId: string,
    paymentData: {
      methodId: string;
      creditCardId?: string;
      couponCode?: string;
    },
    cartId: string,
    freight: number | Decimal,
    discountValue?: number | Decimal
  ) {
    return await prismaClient.$transaction(async (prisma) => {
      console.log('Procurando carrinho:', { cartId, userId });
      console.log('Buscando carrinho com ID:', cartId);

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
      console.log('Carrinho encontrado:', cart);

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

      const paymentMethod = await prisma.paymentMethod.findUnique({
        where: {
          id: paymentData.methodId,
        },
      });

      if (!paymentMethod) throw new Error('Método de pagamento inválido');

      if (paymentMethod.type === 'credit_card' && !paymentData.creditCardId) {
        throw new Error('Pagamento com cartão requer ID do cartão');
      }

      if (paymentMethod.type === 'coupon' && !paymentData.couponCode) {
        throw new Error('Pagamento com cupom requer código do cupom');
      }

      let exchangeCouponId: string | undefined;

      if (paymentMethod.type === 'coupon' && paymentData.couponCode) {
        const coupon = await prisma.exchangeCoupon.findUnique({
          where: {
            code: paymentData.couponCode,
            status: 'active',
            isUsed: false,
          },
        });

        if (!coupon) throw new Error('Cupom inválido ou já utilizado');

        exchangeCouponId = coupon.id;
      }

      const itemsTotal = cart.items.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
      );

      const discount = discountValue ? Number(discountValue) : 0;
      const totalValue = itemsTotal + Number(freight) - discount;

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
            create: {
              paymentMethodId: paymentData.methodId,
              amount: new Decimal(totalValue),
              status: 'pending',
              creditCardId:
                paymentMethod.type === 'credit_card'
                  ? paymentData.creditCardId
                  : null,
              exchangeCouponId:
                paymentMethod.type === 'coupon' ? exchangeCouponId : null,
            },
          },
        },
        include: {
          items: true,
          payments: true,
        },
      });

      if (paymentMethod.type === 'coupon' && exchangeCouponId) {
        await prisma.exchangeCoupon.update({
          where: { id: exchangeCouponId },
          data: { isUsed: true },
        });
      }

      // Limpar o carrinho
      await prisma.cartItem.deleteMany({ where: { cartId } });

      return order;
    });
  }
}

export { CreateOrderDb };
