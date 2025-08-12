import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { BudgetRepository } from './budget.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository, PrismaService],
})
export class BudgetModule {}
