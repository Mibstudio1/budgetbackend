import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseEntryService } from './expense-entry.service';
import { CreateExpenseEntryDto } from './dto/create-expense-entry.dto';
import { UpdateExpenseEntryDto } from './dto/update-expense-entry.dto';
import { SearchExpenseDto } from './dto/search-expense-entry.dto';

@Controller('expense-entry')
export class ExpenseEntryController {
  constructor(private readonly expenseEntryService: ExpenseEntryService) {}

  @Post('create')
  create(@Body() createExpenseEntryDto: CreateExpenseEntryDto) {
    return this.expenseEntryService.create(createExpenseEntryDto);
  }

  @Post('recently')
  search(@Body() searchExpenseDto: SearchExpenseDto) {
    return this.expenseEntryService.search(searchExpenseDto);
  }

  @Get('search')
  searchByQuery(@Query() query: any) {
    const searchDto: SearchExpenseDto = {
      search: query.search || '',
      startDate: query.startDate || '',
      endDate: query.endDate || '',
      category: query.category || '',
      status: query.status || ''
    };
    return this.expenseEntryService.search(searchDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseEntryDto: UpdateExpenseEntryDto) {
    return this.expenseEntryService.update(id, updateExpenseEntryDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { isPaid: boolean }) {
    return this.expenseEntryService.updateStatus(id, body.isPaid);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseEntryService.remove(id);
  }
}
