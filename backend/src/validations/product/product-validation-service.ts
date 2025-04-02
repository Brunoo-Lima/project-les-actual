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

  // Em ProductValidationService
  async validateStockProduct(items: ICartItem[], tx: any = prismaClient) {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true },
      });

      if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name}`);
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
