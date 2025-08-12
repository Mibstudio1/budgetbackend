import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post('create')
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get('get-budget')
  findAll() {
    return this.budgetService.findAll();
  }

  @Patch('update')
  update(@Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(updateBudgetDto);
  }

  @Get('available-projects')
  getAvailableProjects() {
    return this.budgetService.getAvailableProjects();
  }

  @Delete()
  remove(@Query('budgetId') budgetId: string) {
    return this.budgetService.remove(budgetId);
  }
}
