import { Module } from '@nestjs/common';
import { ExpenseEntryService } from './expense-entry.service';
import { ExpenseEntryController } from './expense-entry.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ExpenseEntryRepository } from './expense-entry.repository';

@Module({
  controllers: [ExpenseEntryController],
  providers: [ExpenseEntryService, PrismaService, ExpenseEntryRepository],
})
export class ExpenseEntryModule {}
