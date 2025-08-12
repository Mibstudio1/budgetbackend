import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardRepo } from './dashboard.repository';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService, DashboardRepo],
})
export class DashboardModule {}
