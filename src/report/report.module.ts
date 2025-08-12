import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportRepo } from './report.repository';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PrismaService, ReportRepo],
})
export class ReportModule {}
