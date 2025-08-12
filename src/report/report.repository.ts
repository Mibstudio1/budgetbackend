import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportCostDto } from './dto/report-cost-profit.dto';
import { ReportOutstandDto } from './dto/report-outstand.dto';

@Injectable()
export class ReportRepo {
  constructor(private prisma: PrismaService) {}
  getCostProfit({ projectName, type, status }: ReportCostDto) {
    const where: any = {};

    if (projectName?.trim()) {
      where.name = {
        contains: projectName,
        mode: 'insensitive',
      };
    }

    if (type?.trim() && type.toLowerCase() !== 'all') {
      where.type = type;
    }

    if (status?.trim() && status.toLowerCase() !== 'all') {
      where.status = status;
    }

    return this.prisma.bG_Project.findMany({
      where,
      include: {
        salesEntry: true,
        expenseEntries: true,
      },
    });
  }

  getOutstand({ projectName, item, startDate, endDate }: ReportOutstandDto) {
    const where: any = {};
    if (projectName?.trim()) {
      where.bGProject = {
        name: { contains: projectName, mode: 'insensitive' },
      };
    }

    if (item?.trim()) {
      where.name = { contains: item, mode: 'insensitive' };
    }

    if (startDate && endDate) {
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    where.isPaid = false;

    return this.prisma.bG_Expense_Entries.findMany({
      where,
      include: {
        bGProject: true,
      },
    });
  }
}
