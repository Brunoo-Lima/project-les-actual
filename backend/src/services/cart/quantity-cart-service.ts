import { prismaClient } from '../../config/prisma-client/prisma-client';

class QuantityCartService {
  private prisma: typeof prismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  private async getOrCreateUserCart(userId: string, tx: any) {
    return tx.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async increaseItemQuantity(userId: string, productId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Obtém ou cria o carrinho do usuário
      const cart = await this.getOrCreateUserCart(userId, tx);

      // 2. Verifica o produto e estoque
      const product = await tx.product.findUnique({
        where: { id: productId },
        include: { stock: true },
      });

      if (!product?.stock) {
        throw new Error('Produto sem estoque disponível');
      }

      const available = product.stock.quantity - product.stock.reserved;
      if (available < 1) {
        throw new Error('Estoque insuficiente');
      }

      // 3. Atualiza o item no carrinho
      await tx.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: { quantity: { increment: 1 } },
        create: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });

      // 4. Atualiza o estoque reservado
      await tx.stock.update({
        where: { id: product.stock.id },
        data: { reserved: { increment: 1 } },
      });

      // 5. Retorna o carrinho atualizado
      return this.getOrCreateUserCart(userId, tx);
    });
  }

  async decreaseItemQuantity(userId: string, productId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Obtém o carrinho do usuário
      const cart = await this.getOrCreateUserCart(userId, tx);

      // 2. Verifica se o item existe no carrinho
      const item = await tx.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
      });

      if (!item) {
        throw new Error('Item não encontrado no carrinho');
      }

      // 3. Remove completamente se quantidade for 1
      if (item.quantity <= 1) {
        await tx.cartItem.delete({
          where: { cartId_productId: { cartId: cart.id, productId } },
        });

        // Libera estoque
        const product = await tx.product.findUnique({
          where: { id: productId },
          include: { stock: true },
        });

        if (product?.stock) {
          await tx.stock.update({
            where: { id: product.stock.id },
            data: { reserved: { decrement: 1 } },
          });
        }
      } else {
        // 4. Apenas decrementa se quantidade > 1
        await tx.cartItem.update({
          where: { cartId_productId: { cartId: cart.id, productId } },
          data: { quantity: { decrement: 1 } },
        });

        // Libera estoque
        const product = await tx.product.findUnique({
          where: { id: productId },
          include: { stock: true },
        });

        if (product?.stock) {
          await tx.stock.update({
            where: { id: product.stock.id },
            data: { reserved: { decrement: 1 } },
          });
        }
      }

      // 5. Retorna o carrinho atualizado
      return this.getOrCreateUserCart(userId, tx);
    });
  }
}

export { QuantityCartService };
