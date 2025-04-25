import { Request, Response } from 'express';

import { prismaClient } from '../../../config/prisma-client/prisma-client';

class ListReplacementsController {
  async handle(req: Request, res: Response) {
    try {
      const exchange = await prismaClient.exchangeRequest.findMany({
        where: { status: 'AGUARDANDO_APROVACAO' },
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

export { ListReplacementsController };
