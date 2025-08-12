import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseEntryController } from './expense-entry.controller';
import { ExpenseEntryService } from './expense-entry.service';

describe('ExpenseEntryController', () => {
  let controller: ExpenseEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseEntryController],
      providers: [ExpenseEntryService],
    }).compile();

    controller = module.get<ExpenseEntryController>(ExpenseEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
