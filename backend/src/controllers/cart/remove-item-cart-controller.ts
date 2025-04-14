import { Request, Response } from 'express';
import { ICartItem } from '../../types/ICart';
import { RemoveFromCartService } from '../../services/cart/remove-item-cart-service';

class RemoveItemCartController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { items } = req.body;

      const removeFromCartService = new RemoveFromCartService();

      // Validação básica do input
      if (!items || !Array.isArray(items)) {
        return res.status(400).json({
          success: false,
          message: 'Formato inválido. Envie um array de itens no body',
        });
      }

      // Validação dos itens
      const invalidItems = items.filter(
        (item) => !item.productId || !item.quantity || item.quantity <= 0
      );

      if (invalidItems.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Alguns itens possuem formato inválido',
          invalidItems,
        });
      }

      // Converter quantity para número (caso venha como string)
      const normalizedItems: ICartItem[] = items.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
      }));

      await removeFromCartService.removeItems(userId, normalizedItems);

      return res.status(200).json({
        success: true,
        message: 'Itens removidos do carrinho com sucesso',
      });
    } catch (error: any) {
      console.error('Erro na controller ao remover itens:', error);

      // Tratamento específico para erros de validação conhecidos
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      if (error.message.includes('Quantidade a remover')) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Erro interno no servidor',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}

export { RemoveItemCartController };
