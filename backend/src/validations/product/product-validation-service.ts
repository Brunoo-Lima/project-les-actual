import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICart, ICartItem } from '../../types/ICart';

class ProductValidationService {
  async validateNameProduct(name: string, product_id?: string): Promise<void> {
    if (!name) {
      throw new Error('O nome do produto é obrigatório.');
    }

    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        id: { not: product_id },
        name,
      },
    });

    if (productAlreadyExists) {
      throw new Error('Já existe um produto com esse nome.');
    }
  }

  async validateQuantityProduct(quantity: number): Promise<void> {
    if (quantity <= 0) {
      throw new Error('Quantidade inválida.');
    }
  }

  async validateStockProduct(cart: ICartItem[]): Promise<void> {
    for (const item of cart) {
      const product = await prismaClient.product.findUnique({
        where: {
          id: item.productId,
        },
        include: { stock: true },
      });

      if (!product?.stock || product.stock.quantity < item.quantity) {
        throw new Error(
          `Produto ${product?.name || item.productId} sem estoque suficiente`
        );
      }
    }
  }

  validateCartItems(cart: ICartItem[]): void {
    cart.forEach((item) => {
      if (item.quantity < 1) {
        throw new Error(`Quantidade inválida para o produto ${item.productId}`);
      }
    });
  }
}

export { ProductValidationService };
