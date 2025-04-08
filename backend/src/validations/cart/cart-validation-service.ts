import { prismaClient } from '../../config/prisma-client/prisma-client';

class CartValidationService {
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
    if (!userId) throw new Error('ID do cliente é obrigatório');

    return await prismaClient.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }

  calculateTotals(items: any[]) {
    const subtotal = items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    // Regra de frete - ajuste conforme necessário
    const freight = subtotal > 100 ? 0 : 15;
    const total = subtotal + freight;

    return {
      subtotal,
      freight,
      total,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  formatCartResponse(cart: any, totals: any) {
    return {
      id: cart.id,
      userId: cart.userId,
      user: cart.user,
      items: cart.items.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
        added_at: item.added_at,
        expires_at: item.expires_at,
        product: {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          stock: item.product.stock,
          category: item.product.category,
          images: item.product.images,
        },
      })),
      created_at: cart.created_at,
      updated_at: cart.updated_at,
      expires_at: cart.expires_at,
      isActive: cart.isActive,
      ...totals,
      formattedTotal: `R$ ${totals.total.toFixed(2)}`,
      formattedSubtotal: `R$ ${totals.subtotal.toFixed(2)}`,
      formattedFreight: `R$ ${totals.freight.toFixed(2)}`,
    };
  }
}

export { CartValidationService };
