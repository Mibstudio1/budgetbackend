import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SalesEntryService } from './sales-entry.service';
import { CreateSalesEntryDto } from './dto/create-sales-entry.dto';
import { UpdateSalesEntryDto } from './dto/update-sales-entry.dto';
import { SearchSalesEntryDto } from './dto/search-sales-entry.dto';

@Controller('sales-entry')
export class SalesEntryController {
  constructor(private readonly salesEntryService: SalesEntryService) {}

  @Post('create')
  create(@Body() createSalesEntryDto: CreateSalesEntryDto) {
    return this.salesEntryService.create(createSalesEntryDto);
  }

  @Post('recently')
  search(@Body() searchDto: SearchSalesEntryDto) {
    return this.salesEntryService.search(searchDto);
  }

  @Get('search')
  searchByQuery(@Query() query: any) {
    const searchDto: SearchSalesEntryDto = {
      projectName: query.projectName || '',
      startDate: query.startDate || '',
      endDate: query.endDate || '',
      type: query.type || ''
    };
    return this.salesEntryService.search(searchDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesEntryDto: UpdateSalesEntryDto) {
    return this.salesEntryService.update(id, updateSalesEntryDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.salesEntryService.updateStatus(id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesEntryService.remove(id);
  }
}
