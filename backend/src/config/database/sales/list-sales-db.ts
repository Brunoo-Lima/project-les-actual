import { prismaClient } from '../../prisma-client/prisma-client';

export interface IListSalesDbProps {
  startDate?: Date;
  endDate?: Date;
  groupBy?: ('date' | 'product' | 'brand' | 'universe')[];
  universeFilter?: string;
  dateGrouping?: 'day' | 'month';
}

interface GroupedData {
  [key: string]: {
    [field: string]: string | number;
    quantity: number;
    total: number;
  };
}

class ListSalesDb {
  async listSales({
    startDate,
    endDate,
    groupBy = [],
    universeFilter,
    dateGrouping = 'day',
  }: IListSalesDbProps) {
    const orderItems = await prismaClient.orderItem.findMany({
      where: {
        order: {
          created_at: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
          status: {
            notIn: ['CANCELADO', 'DEVOLUCAO_RECUSADA', 'TROCA_RECUSADA'],
          },
        },
        product: universeFilter ? { universe: universeFilter } : undefined, // Filtro por universo
      },
      include: {
        product: {
          select: {
            name: true,
            brand: true,
            universe: true,
          },
        },
        order: {
          select: {
            created_at: true,
          },
        },
      },
      // orderBy: {
      //   order: {
      //     created_at: 'asc',
      //   },
      // },
    });

    return this.processOrderItems({ orderItems, groupBy, dateGrouping });
  }

  private processOrderItems({
    orderItems,
    groupBy,
    dateGrouping,
    startDate,
    endDate,
  }: {
    orderItems: any[];
    groupBy?: string[];
    dateGrouping: 'day' | 'month';
    startDate?: Date;
    endDate?: Date;
  }) {
    if (!groupBy) return;

    const filteredItems = orderItems.filter((item) => {
      const itemDate = item.order.created_at;
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });

    if (groupBy.length === 0) {
      return filteredItems.map((item) => ({
        date: item.order.created_at.toISOString().split('T')[0],
        name: item.product.name,
        brand: item.product.brand,
        universe: item.product.universe,
        quantity: item.quantity,
        total: item.price * item.quantity,
      }));
    }

    const groupedData: GroupedData = {};

    filteredItems.forEach((item) => {
      const groupKeyParts: Record<string, string> = {};

      groupBy.forEach((field) => {
        if (field === 'date') {
          groupKeyParts[field] = this.formatDateGroup(
            item.order.created_at,
            dateGrouping
          );
        } else {
          groupKeyParts[field] =
            item.product[field as keyof typeof item.product];
        }
      });

      const groupKey = JSON.stringify(groupKeyParts);

      if (!groupedData[groupKey]) {
        groupedData[groupKey] = {
          ...groupKeyParts,
          quantity: 0,
          total: 0,
        };
      }

      groupedData[groupKey].quantity += item.quantity;
      groupedData[groupKey].total += item.price * item.quantity;
    });

    return Object.values(groupedData);
  }

  private formatDateGroup(date: Date, grouping: 'day' | 'month'): string {
    if (grouping === 'month') {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}`;
    }
    return date.toISOString().split('T')[0];
  }
}

export { ListSalesDb };
