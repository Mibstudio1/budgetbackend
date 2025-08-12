import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RevenueTargetService } from './revenue-target.service';
import { CreateRevenueTargetDto } from './dto/create-revenue-target.dto';
import { UpdateRevenueTargetDto } from './dto/update-revenue-target.dto';

@Controller('revenue-target')
export class RevenueTargetController {
  constructor(private readonly revenueTargetService: RevenueTargetService) { }

  @Post('create')
  create(@Body() createRevenueTargetDto: CreateRevenueTargetDto) {
    return this.revenueTargetService.create(createRevenueTargetDto);
  }

  @Get('all')
  findAll() {
    return this.revenueTargetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenueTargetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenueTargetDto: UpdateRevenueTargetDto) {
    return this.revenueTargetService.update(id, updateRevenueTargetDto);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() updateRevenueTargetDto: UpdateRevenueTargetDto) {
    return this.revenueTargetService.update(id, updateRevenueTargetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueTargetService.remove(id);
  }
}
