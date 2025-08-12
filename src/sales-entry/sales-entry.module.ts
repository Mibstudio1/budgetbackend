import { Module } from '@nestjs/common';
import { SalesEntryService } from './sales-entry.service';
import { SalesEntryController } from './sales-entry.controller';
import { SalesEntryRepository } from './sales-entry.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SalesEntryController],
  providers: [SalesEntryService, SalesEntryRepository, PrismaService],
})
export class SalesEntryModule {}
