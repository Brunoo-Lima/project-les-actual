import { prismaClient } from '../../config/prisma-client/prisma-client';

class OrderValidationService {
  async validationExistingCart(userId: string): Promise<void> {
    const existingCart = await prismaClient.cart.findUnique({
      where: {
        userId,
      },
    });

    if (existingCart) {
      throw new Error('Usuário já possui um carrinho ativo');
    }
  }

  async getExistingCart(userId: string) {
    return await prismaClient.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }
}

export { OrderValidationService };
