import { Request, Response } from 'express';
import { UpdateReturnProductService } from '../../../services/order/return-product/update-return-product-service';
import { ORDER_STATUS } from '../../../config/database/order/return-product/return-product-general';

class UpdateReturnProductController {
  async handle(req: Request, res: Response) {
    try {
      const { status, id, requestType } = req.body;

      // Validação básica dos parâmetros de entrada
      if (!id || !status) {
        return res.status(400).json({ error: 'ID, status são obrigatórios' });
      }

      // Verifica se o status recebido é válido
      if (!Object.values(ORDER_STATUS).includes(status)) {
        return res.status(400).json({
          error: 'Status inválido',
          validStatuses: Object.values(ORDER_STATUS),
        });
      }

      // if (!['exchange', 'return'].includes(requestType)) {
      //   return res.status(400).json({
      //     error: 'requestType inválido',
      //     validRequestTypes: ['exchange', 'return'],
      //   });
      // }

      const updateReturnProductService = new UpdateReturnProductService();
      const result = await updateReturnProductService.execute(
        id,
        status,
        requestType
      );

      // Resposta mais informativa
      res.status(200).json({
        success: true,
        message: 'Status atualizado com sucesso',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateReturnProductController };
