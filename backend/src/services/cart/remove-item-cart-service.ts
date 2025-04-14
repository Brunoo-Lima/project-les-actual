import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICartItem } from '../../types/ICart';
import { CartValidationService } from '../../validations/cart/cart-validation-service';

class RemoveFromCartService {
  private cartValidationService: CartValidationService;

  constructor() {
    this.cartValidationService = new CartValidationService();
  }

  private async handleStockRestore(items: ICartItem[], tx: any) {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { stock: true },
      });

      if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
      if (!product.stock)
        throw new Error(`Produto ${item.productId} sem estoque`);

      // Atualiza tanto a quantidade quanto o reservado
      await tx.stock.update({
        where: { id: product.stock.id },
        data: {
          reserved: { decrement: item.quantity },
        },
      });
    }
  }

  async removeItems(userId: string, itemsToRemove: ICartItem[]) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );
    if (!existingCart) throw new Error('Carrinho não encontrado');

    try {
      return await prismaClient.$transaction(async (tx) => {
        // Obtém os itens atuais do carrinho
        const currentItems = await tx.cartItem.findMany({
          where: {
            cartId: existingCart.id,
            productId: { in: itemsToRemove.map((item) => item.productId) },
          },
        });

        // Valida os itens e quantidades
        const validatedItems = itemsToRemove.map((itemToRemove) => {
          const existingItem = currentItems.find(
            (item) => item.productId === itemToRemove.productId
          );

          if (!existingItem) {
            throw new Error(
              `Produto ${itemToRemove.productId} não encontrado no carrinho`
            );
          }

          // Se quantity for 0, remove totalmente o item
          const quantityToRemove =
            itemToRemove.quantity === 0
              ? existingItem.quantity
              : Math.min(itemToRemove.quantity, existingItem.quantity);

          return {
            productId: itemToRemove.productId,
            quantity: quantityToRemove,
          };
        });

        // Restaura o estoque (diminui o reservado)
        await this.handleStockRestore(validatedItems, tx);

        // Remove os itens do carrinho
        for (const item of validatedItems) {
          await tx.cartItem.delete({
            where: {
              cartId_productId: {
                cartId: existingCart.id,
                productId: item.productId,
              },
            },
          });
        }

        return tx.cart.findUnique({
          where: { id: existingCart.id },
          include: { items: { include: { product: true } } },
        });
      });
    } catch (error: any) {
      console.error('Erro ao remover itens do carrinho:', error);
      throw new Error(`Falha ao remover itens do carrinho: ${error.message}`);
    }
  }

  // Método para limpar todo o carrinho
  async clearCart(userId: string) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );
    if (!existingCart) throw new Error('Carrinho não encontrado');

    try {
      return await prismaClient.$transaction(async (tx) => {
        // Obtém todos os itens do carrinho
        const currentItems = await tx.cartItem.findMany({
          where: { cartId: existingCart.id },
        });

        // Restaura todo o estoque reservado
        await this.handleStockRestore(
          currentItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          tx
        );

        // Remove todos os itens do carrinho
        await tx.cartItem.deleteMany({
          where: { cartId: existingCart.id },
        });

        return tx.cart.findUnique({
          where: { id: existingCart.id },
          include: { items: { include: { product: true } } },
        });
      });
    } catch (error: any) {
      console.error('Erro ao limpar carrinho:', error);
      throw new Error(`Falha ao limpar carrinho: ${error.message}`);
    }
  }
}

export { RemoveFromCartService };
