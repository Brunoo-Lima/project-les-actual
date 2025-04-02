import { prismaClient } from '../../prisma-client/prisma-client';

class CreateOrderDb {
  async createOrder(
    userId: string,
    addressId: string,
    paymentMethodId: string
  ) {
    // return await prismaClient.$transaction(async (prisma) => {
    //   const order = await prisma.order.create({
    //     data: {
    //       userId,
    //       total,
    //       status: 'Pendente',
    //       freight,
    //       addressId,
    //       items: {
    //         create: cart.items.map((item) => ({
    //           productId: item.productId,
    //           quantity: item.quantity,
    //         }))
    //       }
    //     }
    //   })
    // })
  }
}

export { CreateOrderDb };
