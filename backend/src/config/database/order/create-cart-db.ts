import { ICart } from '../../../types/ICart';
import { prismaClient } from '../../prisma-client/prisma-client';

class CreateCartDb {
  async createCart(userId: string, cart: Omit<ICart, 'userId'>) {
    return await prismaClient.cart.create({
      data: {
        userId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      select: {
        id: true,
        userId: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

export { CreateCartDb };
