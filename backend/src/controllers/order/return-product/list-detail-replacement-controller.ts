import { Request, Response } from 'express';

import { prismaClient } from '../../../config/prisma-client/prisma-client';

class ListDetailReplacementController {
  async handle(req: Request, res: Response) {
    try {
      const { exchangeId } = req.params;

      const exchange = await prismaClient.exchangeRequest.findFirst({
        where: { id: exchangeId },
        include: {
          order: true,
          coupon: true,
        },
      });

      res.status(200).json(exchange);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { ListDetailReplacementController };
