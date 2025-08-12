import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportCostDto } from './dto/report-cost-profit.dto';
import { ReportOutstandDto } from './dto/report-outstand.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('outstanding-expense')
  getOutstand(@Body() reportOutStand: ReportOutstandDto) {
    return this.reportService.getOutstand(reportOutStand);
  }

  @Get('cost-profit')
  getCostProfit(@Query() reportCostDto: ReportCostDto) {
    return this.reportService.getCostProfit(reportCostDto);
  }

}
