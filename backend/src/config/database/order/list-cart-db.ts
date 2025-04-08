import { prismaClient } from '../../prisma-client/prisma-client';

class ListCartDb {
  async listCart(userId: string) {
    return await prismaClient.cart.findFirst({
      where: {
        userId,
        // isActive: true,
        // expires_at: {
        //   gt: new Date(), // Só retorna carrinhos não expirados
        // },
      },
      include: {
        items: {
          where: {
            // isExpired: false,
            // expires_at: {
            //   gt: new Date(), // Itens não expirados
            // },
          },
          include: {
            product: {
              include: {
                stock: true,
              },
            },
          },
          orderBy: {
            added_at: 'asc',
          },
        },

        // user: {
        //   select: {
        //     id: true,
        //     name: true,
        //     email: true,
        //   },
        // },
      },
    });
  }
}

export { ListCartDb };
