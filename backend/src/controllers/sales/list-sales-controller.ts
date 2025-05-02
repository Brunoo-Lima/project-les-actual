import { Request, Response } from 'express';
import { ListSalesService } from '../../services/sales/list-sales-service';
import { parseISO, isValid } from 'date-fns';

class ListSalesController {
  async handle(req: Request, res: Response) {
    const {
      startDate: startDateStr,
      endDate: endDateStr,
      groupBy,
      universe,
      dateGrouping: dateGroupingQuery = 'day',
    } = req.query;

    try {
      const startDate = parseISO(startDateStr as string);
      const endDate = parseISO(endDateStr as string);

      const validDateGroupings = ['day', 'month'] as const;
      const dateGrouping = validDateGroupings.includes(
        dateGroupingQuery as 'day' | 'month'
      )
        ? (dateGroupingQuery as 'day' | 'month')
        : 'day'; // Fallback para 'day' se inválido

      // Processar groupBy (pode ser string ou array de strings)
      const groupByArray =
        typeof groupBy === 'string'
          ? groupBy.split(',')
          : Array.isArray(groupBy)
          ? groupBy
          : [];

      const listSalesService = new ListSalesService();
      const sales = await listSalesService.execute({
        startDate,
        endDate,
        groupBy: groupByArray as ('date' | 'product' | 'brand' | 'universe')[],
        universeFilter: universe as string,
        dateGrouping,
      });

      return res.json({
        success: true,
        data: sales,
        // meta: {
        //   startDate: startDate.toISOString(),
        //   endDate: endDate.toISOString(),
        //   universe: universe || 'all',
        //   count: sales.length,
        // },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'An error occurred while processing your request',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      });
    }
  }
}

export { ListSalesController };
