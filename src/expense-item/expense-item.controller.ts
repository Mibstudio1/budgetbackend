import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ExpenseItemService } from './expense-item.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('expense-item')
@UseGuards(JwtAuthGuard)
export class ExpenseItemController {
  constructor(private readonly expenseItemService: ExpenseItemService) {}

  @Get()
  async getAllExpenseItems() {
    return await this.expenseItemService.getAllExpenseItems();
  }

  @Get('group/:group')
  async getExpenseItemsByGroup(@Param('group') group: string) {
    return await this.expenseItemService.getExpenseItemsByGroup(group);
  }

  @Post()
  async createExpenseItem(@Body() data: {
    name: string;
    group: string;
    description?: string;
    createdBy: string;
  }) {
    return await this.expenseItemService.createExpenseItem(data);
  }

  @Put(':id')
  async updateExpenseItem(
    @Param('id') id: string,
    @Body() data: {
      name?: string;
      group?: string;
      description?: string;
      isActive?: boolean;
    }
  ) {
    return await this.expenseItemService.updateExpenseItem(id, data);
  }

  @Delete(':id')
  async deleteExpenseItem(@Param('id') id: string) {
    return await this.expenseItemService.deleteExpenseItem(id);
  }

  @Post('initialize')
  async initializeDefaultExpenseItems(@Body() data: { createdBy: string }) {
    return await this.expenseItemService.initializeDefaultExpenseItems(data.createdBy);
  }
}
