import { Controller, Get } from '@nestjs/common';
import { OptionsService } from './options.service';
import { Public } from '../common/decorators/public.decorator';
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Public()
  @Get('project-group')
  findProjectGroup() {
    return this.optionsService.findProjectGroup();
  }

  @Public()
  @Get('project-status')
  findProjectStatus() {
    return this.optionsService.findProjectStatus();
  }

  @Public()
  @Get('expense-items')
  findExpenseItems() {
    return this.optionsService.findExpenseItems();
  }
}
