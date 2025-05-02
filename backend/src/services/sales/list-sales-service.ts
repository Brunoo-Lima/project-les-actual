import {
  IListSalesDbProps,
  ListSalesDb,
} from '../../config/database/sales/list-sales-db';
import { SalesValidation } from '../../validations/sales/sales-validation';

class ListSalesService {
  private listSalesDb: ListSalesDb;
  private salesValidation: SalesValidation;

  constructor() {
    this.listSalesDb = new ListSalesDb();
    this.salesValidation = new SalesValidation();
  }

  async execute({
    startDate,
    endDate,
    groupBy,
    universeFilter,
    dateGrouping,
  }: IListSalesDbProps) {
    this.salesValidation.validateDates(startDate, endDate);

    try {
      const sales = await this.listSalesDb.listSales({
        startDate,
        endDate,
        groupBy,
        universeFilter,
        dateGrouping,
      });
      return sales;
    } catch (error) {
      console.error('Error ao listar vendas', error);
      throw new Error('Error ao listar vendas');
    }
  }
}

export { ListSalesService };
