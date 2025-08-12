import { Injectable } from '@nestjs/common';
import { OptionRepository } from './options.repository';

@Injectable()
export class OptionsService {
  constructor(private readonly optionsRepo: OptionRepository) {}

  findProjectGroup() {
    return this.optionsRepo.findProjectGroup();
  }

  findProjectStatus() {
    return this.optionsRepo.findProjectStatus();
  }

  findExpenseItems() {
    return this.optionsRepo.findExpenseItems();
  }
}
