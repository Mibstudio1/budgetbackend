import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpenseItemService {
  constructor(private prisma: PrismaService) {}

  // Get all expense items
  async getAllExpenseItems() {
    try {
      const items = await this.prisma.bG_Expense_Item.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return {
        success: true,
        result: items,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch expense items',
        error: error.message,
      };
    }
  }

  // Get expense items by group
  async getExpenseItemsByGroup(group: string) {
    try {
      const items = await this.prisma.bG_Expense_Item.findMany({
        where: {
          group: group,
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return {
        success: true,
        result: items,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch expense items by group',
        error: error.message,
      };
    }
  }

  // Create new expense item
  async createExpenseItem(data: {
    name: string;
    group: string;
    description?: string;
    createdBy: string;
  }) {
    try {
      // Check if item already exists
      const existingItem = await this.prisma.bG_Expense_Item.findFirst({
        where: {
          name: data.name,
        },
      });

      if (existingItem) {
        return {
          success: false,
          message: 'Expense item already exists',
        };
      }

      const item = await this.prisma.bG_Expense_Item.create({
        data: {
          name: data.name,
          group: data.group,
          description: data.description,
          createdBy: data.createdBy,
        },
      });

      return {
        success: true,
        result: item,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create expense item',
        error: error.message,
      };
    }
  }

  // Update expense item
  async updateExpenseItem(id: string, data: {
    name?: string;
    group?: string;
    description?: string;
    isActive?: boolean;
  }) {
    try {
      // Check if item exists
      const existingItem = await this.prisma.bG_Expense_Item.findUnique({
        where: { id },
      });

      if (!existingItem) {
        return {
          success: false,
          message: 'Expense item not found',
        };
      }

      // If updating name, check if new name already exists
      if (data.name && data.name !== existingItem.name) {
        const duplicateItem = await this.prisma.bG_Expense_Item.findFirst({
          where: {
            name: data.name,
            id: { not: id },
          },
        });

        if (duplicateItem) {
          return {
            success: false,
            message: 'Expense item name already exists',
          };
        }
      }

      const item = await this.prisma.bG_Expense_Item.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        result: item,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update expense item',
        error: error.message,
      };
    }
  }

  // Delete expense item (soft delete)
  async deleteExpenseItem(id: string) {
    try {
      // Check if item exists
      const existingItem = await this.prisma.bG_Expense_Item.findUnique({
        where: { id },
      });

      if (!existingItem) {
        return {
          success: false,
          message: 'Expense item not found',
        };
      }

      // Check if item is being used
      if (existingItem.usageCount > 0) {
        return {
          success: false,
          message: 'Cannot delete expense item that is being used',
        };
      }

      // Soft delete by setting isActive to false
      const item = await this.prisma.bG_Expense_Item.update({
        where: { id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        result: item,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete expense item',
        error: error.message,
      };
    }
  }

  // Initialize default expense items
  async initializeDefaultExpenseItems(createdBy: string) {
    try {
      const defaultItems = [
        { name: "ค่าจ้าง Outsource", group: "Outsource" },
        { name: "ค่า Server", group: "Server" },
        { name: "ค่า Subscription", group: "Tool" },
        { name: "ค่าน้ำ", group: "Utility" },
        { name: "ค่าไฟ", group: "Utility" },
        { name: "ค่า Internet", group: "Utility" },
        { name: "ค่าเลี้ยงอาหาร", group: "Salary" },
        { name: "ค่าเช่าออฟฟิส", group: "Rental" },
        { name: "ค่าจ้างพนักงาน", group: "Salary" },
        { name: "ค่า incentive การขาย", group: "Incentive" },
      ];

      // Create default expense items
      for (const item of defaultItems) {
        await this.prisma.bG_Expense_Item.upsert({
          where: {
            name: item.name,
          },
          update: {},
          create: {
            name: item.name,
            group: item.group,
            description: `Default expense item: ${item.name}`,
            createdBy,
          },
        });
      }

      return {
        success: true,
        message: 'Default expense items initialized successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to initialize default expense items',
        error: error.message,
      };
    }
  }
}
