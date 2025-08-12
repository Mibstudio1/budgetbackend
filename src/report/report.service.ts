import { Injectable } from '@nestjs/common';
import { ReportRepo } from './report.repository';
import { ReportCostDto } from './dto/report-cost-profit.dto';
import { ReportOutstandDto } from './dto/report-outstand.dto';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepo: ReportRepo) {}

  async getCostProfit(reportCostDto: ReportCostDto) {
    const projects = await this.reportRepo.getCostProfit(reportCostDto);

    return {
      projects: projects.map((e) => {
        const totalCost = Number(
          e.expenseEntries
            .reduce((acc, cur) => acc + Number(cur.cost), 0)
            .toFixed(2),
        );
        const totalSales = Number(
          e.salesEntry
            .reduce((acc, cur) => acc + Number(cur.totalPrice), 0)
            .toFixed(2),
        );
        const profit = Number((totalSales - totalCost).toFixed(2));
        const margin =
          totalSales === 0
            ? 0
            : Number(((profit / totalSales) * 100).toFixed(2));

        return {
          projectName: e.name,
          type: e.type,
          status: e.status,
          totalCost,
          totalSales,
          profit,
          margin,
        };
      }),
    };
  }

  async getOutstand(reportOutstandDto: ReportOutstandDto) {
    const result = await this.reportRepo.getOutstand(reportOutstandDto);
    const today = new Date();

    const list = result.map((e) => {
      const entryDate = new Date(e.date);
      const diffTime = today.getTime() - entryDate.getTime();
      const daysOverdue = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return {
        date: e.date,
        item: e.name,
        projectName: e.bGProject?.name,
        amount: e.cost.toFixed(2),
        daysOverdue,
      };
    });

    const totalItems = result.length;
    const totalAmount = result
      .reduce((acc, cur) => acc + Number(cur.cost), 0)
      .toFixed(2);

    return { list, totalItems, totalAmount };
  }
}
