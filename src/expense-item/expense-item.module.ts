import { Module } from '@nestjs/common';
import { ExpenseItemController } from './expense-item.controller';
import { ExpenseItemService } from './expense-item.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseItemController],
  providers: [ExpenseItemService],
  exports: [ExpenseItemService],
})
export class ExpenseItemModule {}
