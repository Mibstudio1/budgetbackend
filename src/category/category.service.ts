import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Get all categories
  async getAllCategories() {
    try {
      const categories = await this.prisma.bG_Category.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return {
        success: true,
        result: categories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch categories',
        error: error.message,
      };
    }
  }

  // Get categories by type
  async getCategoriesByType(type: 'expense' | 'sales') {
    try {
      const categories = await this.prisma.bG_Category.findMany({
        where: {
          type: type,
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return {
        success: true,
        result: categories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch categories by type',
        error: error.message,
      };
    }
  }

  // Get expense categories
  async getExpenseCategories() {
    return await this.getCategoriesByType('expense');
  }

  // Get sales categories
  async getSalesCategories() {
    return await this.getCategoriesByType('sales');
  }

  // Create new category
  async createCategory(data: {
    name: string;
    type: 'expense' | 'sales';
    description?: string;
    createdBy: string;
  }) {
    try {
      // Check if category already exists
      const existingCategory = await this.prisma.bG_Category.findFirst({
        where: {
          name: data.name,
          type: data.type,
        },
      });

      if (existingCategory) {
        return {
          success: false,
          message: 'Category already exists',
        };
      }

      const category = await this.prisma.bG_Category.create({
        data: {
          name: data.name,
          type: data.type,
          description: data.description,
          createdBy: data.createdBy,
        },
      });

      return {
        success: true,
        result: category,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create category',
        error: error.message,
      };
    }
  }

  // Update category
  async updateCategory(id: string, data: {
    name?: string;
    description?: string;
    isActive?: boolean;
  }) {
    try {
      // Check if category exists
      const existingCategory = await this.prisma.bG_Category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        return {
          success: false,
          message: 'Category not found',
        };
      }

      // If updating name, check if new name already exists
      if (data.name && data.name !== existingCategory.name) {
        const duplicateCategory = await this.prisma.bG_Category.findFirst({
          where: {
            name: data.name,
            type: existingCategory.type,
            id: { not: id },
          },
        });

        if (duplicateCategory) {
          return {
            success: false,
            message: 'Category name already exists',
          };
        }
      }

      const category = await this.prisma.bG_Category.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        result: category,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update category',
        error: error.message,
      };
    }
  }

  // Delete category (soft delete)
  async deleteCategory(id: string) {
    try {
      // Check if category exists
      const existingCategory = await this.prisma.bG_Category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        return {
          success: false,
          message: 'Category not found',
        };
      }

      // Check if category is being used
      if (existingCategory.usageCount > 0) {
        return {
          success: false,
          message: 'Cannot delete category that is being used',
        };
      }

      // Soft delete by setting isActive to false
      const category = await this.prisma.bG_Category.update({
        where: { id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        result: category,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete category',
        error: error.message,
      };
    }
  }

  // Get category usage statistics
  async getCategoryUsageStats() {
    try {
      // Get expense categories usage
      const expenseCategories = await this.prisma.bG_Expense_Entries.groupBy({
        by: ['category'],
        _count: {
          category: true,
        },
      });

      // Get sales types usage
      const salesTypes = await this.prisma.bG_Sales_Entry.groupBy({
        by: ['type'],
        _count: {
          type: true,
        },
      });

      // Update usage count in category table
      for (const expense of expenseCategories) {
        await this.prisma.bG_Category.updateMany({
          where: {
            name: expense.category,
            type: 'expense',
          },
          data: {
            usageCount: expense._count.category,
          },
        });
      }

      for (const sales of salesTypes) {
        await this.prisma.bG_Category.updateMany({
          where: {
            name: sales.type,
            type: 'sales',
          },
          data: {
            usageCount: sales._count.type,
          },
        });
      }

      return {
        success: true,
        result: {
          expenseCategories,
          salesTypes,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get category usage statistics',
        error: error.message,
      };
    }
  }

  // Initialize default categories
  async initializeDefaultCategories(createdBy: string) {
    try {
      const defaultExpenseCategories = [
        'Outsource',
        'Server',
        'Tool',
        'Utility',
        'Salary',
        'Rental',
        'Incentive',
      ];

      const defaultSalesTypes = [
        'Website',
        'Mobile App',
        'Desktop App',
        'API',
        'Database',
        'Consulting',
        'Training',
      ];

      // Create default expense categories
      for (const category of defaultExpenseCategories) {
        await this.prisma.bG_Category.upsert({
          where: {
            name: category,
          },
          update: {},
          create: {
            name: category,
            type: 'expense',
            description: `Default expense category: ${category}`,
            createdBy,
          },
        });
      }

      // Create default sales types
      for (const type of defaultSalesTypes) {
        await this.prisma.bG_Category.upsert({
          where: {
            name: type,
          },
          update: {},
          create: {
            name: type,
            type: 'sales',
            description: `Default sales type: ${type}`,
            createdBy,
          },
        });
      }

      return {
        success: true,
        message: 'Default categories initialized successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to initialize default categories',
        error: error.message,
      };
    }
  }
}
