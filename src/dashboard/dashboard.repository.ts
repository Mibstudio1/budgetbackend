import { PrismaService } from 'src/prisma/prisma.service';
import { SearchProjectDashboardDto } from './dto/search-project-dashboard.dto';
import { Injectable } from '@nestjs/common';
import { SearchMonthlyDto } from './dto/search-monthly-dashboard.dto';
import moment from 'moment';

@Injectable()
export class DashboardRepo {
  constructor(private prisma: PrismaService) {}

  async searchProject({ projectName }: SearchProjectDashboardDto) {
    const where: any = {};
    if (projectName?.trim()) {
      where.name = {
        contains: projectName,
        mode: 'insensitive',
      };
    }

    return {
      search: await this.prisma.bG_Project.findMany({
        where,
        include: {
          salesEntry: true,
          expenseEntries: true,
          BG_Budget: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      all: await this.prisma.bG_Project.findMany({
        include: {
          salesEntry: true,
          expenseEntries: true,
          BG_Budget: true,
        },
      }),
    };
  }

  async searchMonthly({ projectName, month }: SearchMonthlyDto) {
    const where: any = {};

    if (projectName?.trim()) {
      where.name = {
        contains: projectName,
        mode: 'insensitive',
      };
    }

    const { startDate, endDate, revenueTarget } = await this.getMonthlyDateRangeAndTarget(month);

    where.OR = [
      {
        salesEntry: {
          some: {
            date: { gte: startDate, lt: endDate },
          },
        },
      },
      {
        expenseEntries: {
          some: {
            date: { gte: startDate, lt: endDate },
          },
        },
      },
    ];

    const includeOptions = {
      salesEntry: {
        where: { date: { gte: startDate, lt: endDate } },
      },
      expenseEntries: {
        where: { date: { gte: startDate, lt: endDate } },
      },
      BG_Budget: true,
    };

    return {
      search: await this.prisma.bG_Project.findMany({
        where,
        include: includeOptions,
        orderBy: { updatedAt: 'desc' },
      }),
      all: await this.prisma.bG_Project.findMany({
        where,
        include: includeOptions,
      }),
      revenue: revenueTarget,
    };
  }

  private async getMonthlyDateRangeAndTarget(month?: string) {
    const [year, monthOnly] = (month?.trim() || moment().format('YYYY-MM')).split('-');
    
    const startMoment = moment(`${year}-${monthOnly}`, 'YYYY-MM');
    const startDate = startMoment.format('YYYY-MM-DD');
    const endDate = startMoment.clone().add(1, 'month').format('YYYY-MM-DD');

    const revenueTarget = await this.findRevenueTarget(year, monthOnly);

    return { startDate, endDate, revenueTarget };
  }

  private async findRevenueTarget(year: string, monthOnly: string) {
    const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    
    const selectedMonthName = monthNames[parseInt(monthOnly) - 1];
    const searchKeys = [
      `${selectedMonthName} ${year}`,
      `${year}-${monthOnly}`,
    ];

    // Try exact matches first
    for (const key of searchKeys) {
      const target = await this.prisma.bG_Revenue_Targets.findFirst({
        where: { month: key }
      });
      if (target) return target;
    }

    // Fallback to partial match
    return await this.prisma.bG_Revenue_Targets.findFirst({
      where: {
        AND: [
          { month: { contains: selectedMonthName } },
          { month: { contains: year } }
        ]
      }
    });
  }
}
