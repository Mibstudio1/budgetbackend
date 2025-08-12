import { Module } from '@nestjs/common';
import { RevenueTargetService } from './revenue-target.service';
import { RevenueTargetController } from './revenue-target.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueTargetRepository } from './revenue-target.repository';

@Module({
  controllers: [RevenueTargetController],
  providers: [RevenueTargetService, PrismaService, RevenueTargetRepository],
})
export class RevenueTargetModule {}
