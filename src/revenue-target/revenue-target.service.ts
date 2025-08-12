import { Injectable } from '@nestjs/common';
import { CreateRevenueTargetDto } from './dto/create-revenue-target.dto';
import { UpdateRevenueTargetDto } from './dto/update-revenue-target.dto';
import { RevenueTargetRepository } from './revenue-target.repository';

@Injectable()
export class RevenueTargetService {
  constructor(private readonly revenueTarget: RevenueTargetRepository) {}

  async create(createRevenueTargetDto: CreateRevenueTargetDto) {
    await this.revenueTarget.create(createRevenueTargetDto)
    return [];
  }

  async findAll() {
    const targets = await this.revenueTarget.findAll();
    return {
      targets: targets
    };
  }

  async findOne(id: string) {
    const target = await this.revenueTarget.findOne(id);
    return {
      success: true,
      result: target
    };
  }

  async update(id: string, updateRevenueTargetDto: UpdateRevenueTargetDto) {
    await this.revenueTarget.update(id, updateRevenueTargetDto);
    return {
      success: true,
      message: 'Revenue target updated successfully'
    };
  }

  async remove(id: string) {
    await this.revenueTarget.remove(id);
    return {
      success: true,
      message: 'Revenue target deleted successfully'
    };
  }
}
