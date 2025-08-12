import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalesEntryDto } from './dto/create-sales-entry.dto';
import { SearchSalesEntryDto } from './dto/search-sales-entry.dto';
``
@Injectable()
export class SalesEntryRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    date,
    projectId,
    description,
    totalPrice,
    type,
    createdBy,
  }: CreateSalesEntryDto) {
    await this.prisma.bG_Sales_Entry.create({
      data: {
        date,
        bGProjectId: projectId,
        description,
        totalPrice,
        type,
        createdBy,
      },
    });
  }

  async search({ projectName, startDate, endDate, type }: SearchSalesEntryDto) {
    const filters: any = {};

    if (startDate?.trim() && endDate?.trim()) {
      filters.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (type?.trim()) {
      filters.type = type;
    }

    const projectFilter = projectName?.trim()
      ? {
          bGProject: {
            name: {
              contains: projectName,
              mode: 'insensitive',
            },
          },
        }
      : {};

    const result = await this.prisma.bG_Sales_Entry.findMany({
      where: {
        ...filters,
        ...projectFilter,
      },
      include: {
        bGProject: true,
      },
    });

    return result;
  }

  async update(id: string, updateData: any) {
    try {
      const updatedSalesEntry = await this.prisma.bG_Sales_Entry.update({
        where: { id },
        data: {
          date: updateData.date,
          description: updateData.description,
          totalPrice: updateData.totalPrice || updateData.selling,
          type: updateData.type,
          bGProjectId: updateData.bG_projectId,
        },
        include: {
          bGProject: true,
        },
      });
      return updatedSalesEntry;
    } catch (error) {
      throw new Error(`Failed to update sales entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      const updatedSalesEntry = await this.prisma.bG_Sales_Entry.update({
        where: { id },
        data: {
          status,
        },
        include: {
          bGProject: true,
        },
      });
      return updatedSalesEntry;
    } catch (error) {
      throw new Error(`Failed to update sales entry status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.bG_Sales_Entry.delete({
        where: { id },
      });
      return { success: true, message: 'Sales entry deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete sales entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
