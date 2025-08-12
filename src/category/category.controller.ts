import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('expense')
  async getExpenseCategories() {
    return await this.categoryService.getExpenseCategories();
  }

  @Get('sales')
  async getSalesCategories() {
    return await this.categoryService.getSalesCategories();
  }

  @Post()
  async createCategory(@Body() data: {
    name: string;
    type: 'expense' | 'sales';
    description?: string;
    createdBy: string;
  }) {
    return await this.categoryService.createCategory(data);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: {
      name?: string;
      type?: 'expense' | 'sales';
      description?: string;
      isActive?: boolean;
    }
  ) {
    return await this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
