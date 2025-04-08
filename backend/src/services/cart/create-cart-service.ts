import { CreateCartDb } from '../../config/database/order/create-cart-db';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICart, ICartItem } from '../../types/ICart';
import { CartValidationService } from '../../validations/cart/cart-validation-service';
import { ProductValidationService } from '../../validations/product/product-validation-service';

class CreateCartService {
  private createCartDb: CreateCartDb;
  private productValidationService: ProductValidationService;
  private cartValidationService: CartValidationService;

  constructor() {
    this.createCartDb = new CreateCartDb();
    this.productValidationService = new ProductValidationService();
    this.cartValidationService = new CartValidationService();
  }

  private async handleStockUpdate(items: ICartItem[], tx: any) {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { stock: true },
      });

      if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
      if (!product.stock)
        throw new Error(`Produto ${item.productId} sem estoque`);
      if (product.stock.quantity < item.quantity) {
        throw new Error(
          `Estoque insuficiente para ${product.name}. Disponível: ${product.stock.quantity}, Solicitado: ${item.quantity}`
        );
      }

      await tx.stock.update({
        where: { id: product.stock.id },
        data: {
          quantity: { decrement: item.quantity },
          reserved: { increment: item.quantity },
        },
      });
    }
  }

  private async addItemsToCart(userId: string, items: ICartItem[]) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );
    if (!existingCart) throw new Error('Carrinho não encontrado');

    try {
      return await prismaClient.$transaction(async (tx) => {
        this.productValidationService.validateCartItems(items);
        await this.handleStockUpdate(items, tx);

        // Atualiza itens do carrinho
        for (const item of items) {
          await tx.cartItem.upsert({
            where: {
              cartId_productId: {
                cartId: existingCart.id,
                productId: item.productId,
              },
            },
            update: { quantity: { increment: item.quantity } },
            create: {
              cartId: existingCart.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }

        return tx.cart.findUnique({
          where: { id: existingCart.id },
          include: { items: { include: { product: true } } },
        });
      });
    } catch (error: any) {
      console.error('Erro ao atualizar carrinho:', error);
      throw new Error(`Falha ao atualizar carrinho: ${error.message}`);
    }
  }

  async execute(userId: string, cart: Omit<ICart, 'userId'>) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );

    if (existingCart) {
      return { cartData: await this.addItemsToCart(userId, cart.items) };
    }

    try {
      const cartData = await prismaClient.$transaction(async (tx) => {
        this.productValidationService.validateCartItems(cart.items);
        await this.handleStockUpdate(cart.items, tx);

        return tx.cart.create({
          data: {
            userId,
            items: {
              create: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: { items: { include: { product: true } } },
        });
      });

      return { cartData };
    } catch (error: any) {
      console.error('Erro ao criar carrinho:', error);
      throw new Error('Falha ao criar carrinho: ' + error.message);
    }
  }
}

export { CreateCartService };
