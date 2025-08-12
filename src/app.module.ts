import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { RevenueTargetModule } from './revenue-target/revenue-target.module';
import { SalesEntryModule } from './sales-entry/sales-entry.module';
import { ExpenseEntryModule } from './expense-entry/expense-entry.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportModule } from './report/report.module';
import { OptionsModule } from './options/options.module';
import { AuthenModule } from './authen/authen.module';
import { UserModule } from './user/user.module';
import { BudgetModule } from './budget/budget.module';
import { CategoryModule } from './category/category.module';
import { ExpenseItemModule } from './expense-item/expense-item.module';

@Module({
  imports: [PrismaModule, ProjectModule, RevenueTargetModule, SalesEntryModule, ExpenseEntryModule, DashboardModule, ReportModule, OptionsModule, AuthenModule, UserModule, BudgetModule, CategoryModule, ExpenseItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
