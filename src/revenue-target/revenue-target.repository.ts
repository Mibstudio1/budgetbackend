import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRevenueTargetDto } from './dto/create-revenue-target.dto';
import { UpdateRevenueTargetDto } from './dto/update-revenue-target.dto';

@Injectable()
export class RevenueTargetRepository {
  constructor(private prisma: PrismaService) {}
  
  async create({ date, target, createdBy }: CreateRevenueTargetDto) {
    if (!date || target === undefined || !createdBy) {
      throw new Error('Date, target, and createdBy are required');
    }
    
    try {
      return await this.prisma.bG_Revenue_Targets.create({
        data: {
          month: date,
          target: Number(target),
          createdBy,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create revenue target: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async findAll() {
    return await this.prisma.bG_Revenue_Targets.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.bG_Revenue_Targets.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateRevenueTargetDto: UpdateRevenueTargetDto) {
    if (!id) {
      throw new Error('ID is required for update');
    }
    
    const updateData: any = {};
    
    if (updateRevenueTargetDto.date) {
      updateData.month = updateRevenueTargetDto.date;
    }
    
    if (updateRevenueTargetDto.target !== undefined) {
      updateData.target = Number(updateRevenueTargetDto.target);
    }
    
    updateData.updatedAt = new Date();
    
    try {
      return await this.prisma.bG_Revenue_Targets.update({
        where: { id },
        data: updateData
      });
    } catch (error) {
      throw new Error(`Failed to update revenue target: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async remove(id: string) {
    return await this.prisma.bG_Revenue_Targets.delete({
      where: { id }
    });
  }
}
