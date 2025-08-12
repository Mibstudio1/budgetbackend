import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetRepository } from './budget.repository';

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}
  create(createBudgetDto: CreateBudgetDto) {
    return this.budgetRepository.createBudget(createBudgetDto);
  }

  async findAll() {
    const budget = await this.budgetRepository.getBudget();
    return {
      budget: budget.map((e) => {
        // Calculate used budget from expense entries
        const usedBudget = e.bGProject?.expenseEntries?.reduce((sum, expense) => {
          return sum + Number(expense.cost || 0);
        }, 0) || 0;
        
        const remainingBudget = Math.max(0, Number(e.budget) - usedBudget);
        
        return {
          budgetId: e.id,
          description: e.description,
          budget: e.budget,
          projectName: e.bGProject?.name,
          projectType: e.bGProject?.type,
          projectStatus: e.bGProject?.status,
          usedBudget: usedBudget,
          remainingBudget: remainingBudget,
        };
      }),
    };
  }

  update(updateBudgetDto: UpdateBudgetDto) {
    return this.budgetRepository.updateBudget(updateBudgetDto);
  }

  async getAvailableProjects() {
    return await this.budgetRepository.getAvailableProjects();
  }

  async remove(budgetId: string) {
    await this.budgetRepository.removeBudget(budgetId);
  }
}
