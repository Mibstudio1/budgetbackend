import { Injectable } from '@nestjs/common';
import { CreateSalesEntryDto } from './dto/create-sales-entry.dto';
import { UpdateSalesEntryDto } from './dto/update-sales-entry.dto';
import { SalesEntryRepository } from './sales-entry.repository';
import { SearchSalesEntryDto } from './dto/search-sales-entry.dto';

@Injectable()
export class SalesEntryService {
  constructor(private readonly salesEntryRepo: SalesEntryRepository) {}

  async create(createSalesEntryDto: CreateSalesEntryDto) {
    await this.salesEntryRepo.create(createSalesEntryDto);
    return [];
  }

  async search(searchSalesEntry: SearchSalesEntryDto) {
    const records = await this.salesEntryRepo.search(searchSalesEntry);
    return {
      records: records.map((e) => ({
        id: e.id,
        date: e.date,
        projectName: e.bGProject?.name || 'ไม่มีโครงการ',
        description: e.description,
        totalPrice: e.totalPrice,
        type: e.type,
        quantity: 1, // Default quantity since we only store totalPrice
        selling: e.totalPrice, // Use totalPrice as selling price for display
        status: e.status || 'pending', // Add status field
        note: e.note,
      })),
    };
  }

  async update(id: string, updateSalesEntryDto: UpdateSalesEntryDto) {
    return await this.salesEntryRepo.update(id, updateSalesEntryDto);
  }

  async updateStatus(id: string, status: string) {
    return await this.salesEntryRepo.updateStatus(id, status);
  }

  async remove(id: string) {
    return await this.salesEntryRepo.remove(id);
  }
}
