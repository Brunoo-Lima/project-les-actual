import { IUser } from '../../../types/IUser';
import { prismaClient } from '../../prisma-client/prisma-client';

export interface IUserFilter extends Partial<IUser> {
  startDate?: Date;
  endDate?: Date;
}

class FilterClientDb {
  async filterClient(filters: IUserFilter = {}) {
    const safeFilters = filters || {};

    const whereClause: any = {};

    // Filtro por nome (usando optional chaining e nullish coalescing)
    if (safeFilters?.name) {
      whereClause.name = {
        contains: safeFilters.name,
        mode: 'insensitive',
      };
    }

    // Filtro por email (com verificação segura)
    if (safeFilters?.email !== undefined && safeFilters.email !== null) {
      whereClause.email = safeFilters.email;
    }

    // Filtro por CPF
    if (safeFilters?.cpf) {
      whereClause.cpf = safeFilters.cpf;
    }

    // Filtro por gênero
    if (safeFilters?.gender) {
      whereClause.gender = safeFilters.gender;
    }

    // Filtro por status (verificação explícita de undefined)
    if (safeFilters?.status !== undefined) {
      whereClause.status = safeFilters.status;
    }

    // Filtro por data
    if (safeFilters?.startDate || safeFilters?.endDate) {
      whereClause.dateOfBirth = {};
      if (safeFilters.startDate) {
        whereClause.dateOfBirth.gte = safeFilters.startDate;
      }
      if (safeFilters.endDate) {
        whereClause.dateOfBirth.lte = safeFilters.endDate;
      }
    }

    // Executa a consulta
    return await prismaClient.user.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    });
  }
}

export { FilterClientDb };
