import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/create-order-service';

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { userId, addressId, paymentData, cartId, freight, discountValue } =
      req.body;

    const createOrderService = new CreateOrderService();

    try {
      const result = await createOrderService.execute(
        userId,
        addressId,
        paymentData,
        cartId,
        freight,
        discountValue
      );
      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro no CreateOrderController:', error);
      return res.status(500).json({ error: 'Falha ao criar pedido' });
    }
  }
}

export { CreateOrderController };
