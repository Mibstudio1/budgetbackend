import { Injectable } from '@nestjs/common';
import { Project_Group, Project_Status, Expense_Items } from '@prisma/client';

@Injectable()
export class OptionRepository {
  findProjectGroup(): Project_Group[] {
    return Object.values(Project_Group);
  }

  findProjectStatus(): Project_Status[] {
    return Object.values(Project_Status);
  }

  findExpenseItems(): Expense_Items[] {
    return Object.values(Expense_Items);
  }
}
