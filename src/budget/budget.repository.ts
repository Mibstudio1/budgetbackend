import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetRepository {
  constructor(private prisma: PrismaService) {}

  async createBudget({
    projectId,
    description,
    budget,
    createdBy,
  }: CreateBudgetDto) {
    await this.prisma.bG_Budget.create({
      data: {
        bGProjectId: projectId,
        description,
        budget,
        createdBy,
      },
    });
  }

  async updateBudget(updateData: UpdateBudgetDto) {
    const { projectId, description, budget, budgetId } = updateData;
    await this.prisma.bG_Budget.update({
      where: { id: budgetId },
      data: {
        bGProjectId: projectId,
        description,
        budget,
      },
    });
  }

  async getBudget() {
    return this.prisma.bG_Budget.findMany({
      select: {
        id: true,
        description: true,
        budget: true,
        bGProject: {
          select: {
            name: true,
            status: true,
            type: true,
            expenseEntries: {
              select: {
                cost: true,
              },
            },
          },
        },
      },
    });
  }

  async getAvailableProjects() {
    // Get all projects that don't have a budget yet, or all projects for selection
    const projects = await this.prisma.bG_Project.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        description: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      projects: projects.map(project => ({
        id: project.id,
        name: project.name,
        type: project.type || 'ไม่ระบุ',
        status: project.status || 'ไม่ระบุ',
        description: project.description || '',
      })),
    };
  }

  async removeBudget(budgetId: string) {
    return this.prisma.bG_Budget.delete({
      where: { id: budgetId },
    });
  }
}
