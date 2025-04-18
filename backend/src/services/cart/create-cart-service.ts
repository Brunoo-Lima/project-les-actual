import { prismaClient } from '../../config/prisma-client/prisma-client';
import { CartValidationService } from '../../validations/cart/cart-validation-service';

class CreateCartService {
  private cartValidationService: CartValidationService;

  constructor() {
    this.cartValidationService = new CartValidationService();
  }

  async execute(userId: string) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );
    if (existingCart) return existingCart;

    return await prismaClient.cart.create({
      data: { userId },
      include: {
        items: { include: { product: true } },
      },
    });
  }
}

export { CreateCartService };
