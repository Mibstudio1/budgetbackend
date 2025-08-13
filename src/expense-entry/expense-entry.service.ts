import { Injectable } from '@nestjs/common';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { ExpenseEntryRepository } from './expense-entry.repository';
import { SearchExpenseDto } from './dto/search-expense-entry.dto';

@Injectable()
export class ExpenseEntryService {
  constructor(private readonly expenseRepo: ExpenseEntryRepository) {}
  async create(createExpenseEntryDto: CreateExpenseEntryDto) {
    await this.expenseRepo.create(createExpenseEntryDto);
    return [];
  }

  async search(searchExpense: SearchExpenseDto) {
    const records = await this.expenseRepo.search(searchExpense);
    const mappedRecords = records.map((e) => ({
      id: e.id,
      date: e.date,
      expense: e.name,
      amount: e.cost,
      projectName: e.bGProject?.name,
      status: e.isPaid,
      isPaid: e.isPaid, // เพิ่ม isPaid field เพื่อให้ frontend ใช้ได้
      category: e.category,
      note: e.note,
    }));

    return {
      records: mappedRecords,
    };
  }

  async update(id: string, updateExpenseEntryDto: UpdateExpenseEntryDto) {
    return await this.expenseRepo.update(id, updateExpenseEntryDto);
  }

  async updateStatus(id: string, isPaid: boolean) {
    return await this.expenseRepo.updateStatus(id, isPaid);
  }

  async remove(id: string) {
    return await this.expenseRepo.remove(id);
  }
}
