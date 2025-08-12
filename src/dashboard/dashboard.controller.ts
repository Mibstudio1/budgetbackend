import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { SearchProjectDashboardDto } from './dto/search-project-dashboard.dto';
import { SearchMonthlyDto } from './dto/search-monthly-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('all-projects')
  async searchProject(@Query() searchProjectDto: SearchProjectDashboardDto) {
    const { search, all } =
      await this.dashboardService.searchProject(searchProjectDto);
    const projectMap = new Map<
      string,
      {
        projectName: string;
        type: string;
        status: string;
        totalSales: number;
        totalCost: number;
      }
    >();

    for (const e of search) {
      const id = e.id;
      const totalSales = e.salesEntry.reduce(
        (acc, cur) => acc + Number(cur.totalPrice || 0),
        0,
      );
      const totalCost = e.expenseEntries.reduce(
        (acc, cur) => acc + Number(cur.cost || 0),
        0,
      );

      if (!projectMap.has(id)) {
        projectMap.set(id, {
          projectName: e.name,
          type: e.type,
          status: e.status,
          totalSales,
          totalCost,
        });
      } else {
        const existing = projectMap.get(id)!;
        existing.totalSales += totalSales;
        existing.totalCost += totalCost;
      }
    }

    const projects = Array.from(projectMap.entries()).map(([id, item]) => {
      const profitLoss = Number((item.totalSales - item.totalCost).toFixed(2));
      return {
        id,
        projectName: item.projectName,
        type: item.type,
        status: item.status,
        totalSales: Number(item.totalSales.toFixed(2)),
        totalCost: Number(item.totalCost.toFixed(2)),
        profitLoss,
        budgetStatus: profitLoss < 0 ? 'ขาดทุน' : 'ปกติ',
      };
    });

    const totalProject = all.length;
    const totalActiveProject = all.reduce(
      (acc, cur) =>
        acc + (cur.status.toLocaleLowerCase() === 'in_progress' ? 1 : 0),
      0,
    );

    const overBudget = all.reduce((acc, cur) => {
      const totalCost = cur.expenseEntries.reduce(
        (accC, curC) => accC + Number(curC.cost),
        0,
      );
      const totalSales = cur.salesEntry.reduce(
        (accS, curS) => accS + Number(curS.totalPrice),
        0,
      );
      const profitLoss = totalSales - totalCost;
      return acc + (profitLoss < 0 ? 1 : 0);
    }, 0);
    const totalProfit = all
      .reduce((acc, cur) => {
        const totalCost = cur.expenseEntries.reduce(
          (accC, curC) => accC + Number(curC.cost),
          0,
        );
        const totalSales = cur.salesEntry.reduce(
          (accS, curS) => accS + Number(curS.totalPrice),
          0,
        );
        const profitLoss = totalSales - totalCost;
        return acc + profitLoss;
      }, 0)
      .toFixed(2);
    return {
      projects,
      totalProject,
      totalActiveProject,
      overBudget,
      totalProfit,
    };
  }

  @Get('monthly-detail')
  async searchMonthly(@Query() searchMonthlyDto: SearchMonthlyDto) {
    const { search, all, revenue } =
      await this.dashboardService.searchMonthly(searchMonthlyDto);
    const projectMap = new Map<
      string,
      { projectName: string; income: number; expense: number }
    >();

    for (const e of search) {
      const id = e.id;
      const income = e.salesEntry.reduce(
        (acc, cur) => acc + Number(cur.totalPrice || 0),
        0,
      );
      const expense = e.expenseEntries.reduce(
        (acc, cur) => acc + Number(cur.cost || 0),
        0,
      );

      if (!projectMap.has(id)) {
        projectMap.set(id, {
          projectName: e.name,
          income,
          expense,
        });
      } else {
        const existing = projectMap.get(id)!;
        existing.income += income;
        existing.expense += expense;
      }
    }

    const projects = Array.from(projectMap.entries()).map(([id, item]) => {
      const profitLoss = Number((item.income - item.expense).toFixed(2));
      return {
        id,
        projectName: item.projectName,
        income: Number(item.income.toFixed(2)),
        expense: Number(item.expense.toFixed(2)),
        profitLoss,
      };
    });

    const incomeObj = all.reduce(
      (acc, project) => {
        for (const entry of project.salesEntry) {
          const type = entry.type;
          const price = Number(entry.totalPrice) || 0;
          acc[type] = (acc[type] || 0) + price;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalIncome = Object.values(incomeObj).reduce(
      (sum, value) => sum + value,
      0,
    );

    const income = Object.entries(incomeObj).map(([type, totalPrice]) => {
      const percent = totalIncome > 0 ? (totalPrice / totalIncome) * 100 : 0;
      return {
        type,
        totalPrice: Number(totalPrice.toFixed(2)),
        totalPercent: Number(percent.toFixed(2)),
      };
    });

    const expenseObj = all.reduce(
      (acc, project) => {
        for (const entry of project.expenseEntries) {
          const type = entry.name;
          const price = Number(entry.cost) || 0;
          acc[type] = (acc[type] || 0) + price;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const costs = Object.values(expenseObj).reduce(
      (sum, value) => sum + value,
      0,
    );

    const expenseItem = Object.entries(expenseObj).map(([name, cost]) => {
      const percent = totalIncome > 0 ? (cost / costs) * 100 : 0;
      return {
        name,
        cost,
        totalPercent: Number(percent.toFixed(2)),
      };
    });

    const monthlyIncome = all
      .reduce((acc, cur) => {
        const sumOfSales = cur.salesEntry.reduce((sum, entry) => {
          return sum + Number(entry.totalPrice || 0);
        }, 0);
        return acc + sumOfSales;
      }, 0)
      .toFixed(2);

    const monthlyExpense = all
      .reduce((acc, cur) => {
        const sumOfSales = cur.expenseEntries.reduce((sum, entry) => {
          return sum + Number(entry.cost || 0);
        }, 0);
        return acc + sumOfSales;
      }, 0)
      .toFixed(2);

    const totalProfitLoss = all.reduce((acc, e) => {
      const income = e.salesEntry.reduce(
        (acc2, cur) => acc2 + Number(cur.totalPrice),
        0,
      );
      const expense = e.expenseEntries.reduce(
        (acc2, cur) => acc2 + Number(cur.cost),
        0,
      );
      return acc + (income - expense);
    }, 0);

    const monthlyProfit = Number(totalProfitLoss.toFixed(2));

    const monthlyTarget = revenue?.target;

    // สร้างข้อมูลรายวันจาก salesEntry และ expenseEntries
    const dailyDataMap = new Map<string, { income: number; expense: number }>();

    // รวบรวมข้อมูลรายได้รายวัน
    all.forEach(project => {
      project.salesEntry.forEach(sale => {
        const date = sale.date;
        const amount = Number(sale.totalPrice) || 0;
        
        if (dailyDataMap.has(date)) {
          const existing = dailyDataMap.get(date)!;
          existing.income += amount;
        } else {
          dailyDataMap.set(date, { income: amount, expense: 0 });
        }
      });

      // รวบรวมข้อมูลรายจ่ายรายวัน
      project.expenseEntries.forEach(expense => {
        const date = expense.date;
        const amount = Number(expense.cost) || 0;
        
        if (dailyDataMap.has(date)) {
          const existing = dailyDataMap.get(date)!;
          existing.expense += amount;
        } else {
          dailyDataMap.set(date, { income: 0, expense: amount });
        }
      });
    });

    // แปลงเป็น array และเรียงตามวันที่
    const dailyData = Array.from(dailyDataMap.entries())
      .map(([date, data]) => ({
        date,
        income: Number(data.income.toFixed(2)),
        expense: Number(data.expense.toFixed(2))
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      projects,
      income,
      expenseItem,
      monthlyIncome,
      monthlyExpense,
      monthlyProfit,
      monthlyTarget,
      dailyData, // เพิ่มข้อมูลรายวัน
    };
  }
}
