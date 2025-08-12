import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { SearchExpenseDto } from './dto/search-expense-entry.dto';

@Injectable()
export class ExpenseEntryRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    date,
    expenseItem,
    cost,
    projectId,
    isPaid,
    createdBy,
    category,
  }: CreateExpenseEntryDto) {
    await this.prisma.bG_Expense_Entries.create({
      data: {
        date,
        name: expenseItem,
        cost,
        bGProjectId: projectId,
        isPaid,
        createdBy,
        category,
      },
    });
  }
  search({ search, startDate, endDate, category, status }: SearchExpenseDto) {
    const where: any = {};

    if (search?.trim()) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          bGProject: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (startDate?.trim() && endDate?.trim()) {
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (category?.trim()) {
      where.category = category;
    }

    if (status?.trim()) {
      const lowerStatus = status.trim().toLowerCase();
      if (lowerStatus === 'true') {
        where.isPaid = true;
      } else if (lowerStatus === 'false') {
        where.isPaid = false;
      }
    }

    return this.prisma.bG_Expense_Entries.findMany({
      where,
      include: {
        bGProject: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async update(id: string, updateData: any) {
    try {
      const updatedExpenseEntry = await this.prisma.bG_Expense_Entries.update({
        where: { id },
        data: {
          date: updateData.date,
          name: updateData.name,
          cost: updateData.cost,
          isPaid: updateData.isPaid,
          category: updateData.category,
          bGProjectId: updateData.bGProjectId,
        },
        include: {
          bGProject: true,
        },
      });
      return updatedExpenseEntry;
    } catch (error) {
      throw new Error(`Failed to update expense entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateStatus(id: string, isPaid: boolean) {
    try {
      const updatedExpenseEntry = await this.prisma.bG_Expense_Entries.update({
        where: { id },
        data: { 
          isPaid,
        },
        include: {
          bGProject: true,
        },
      });
      
      return { success: true, message: 'Expense status updated successfully', data: updatedExpenseEntry };
    } catch (error) {
      throw new Error(`Failed to update expense status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.bG_Expense_Entries.delete({
        where: { id },
      });
      return { success: true, message: 'Expense entry deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete expense entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
