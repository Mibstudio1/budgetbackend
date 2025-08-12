import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseEntryService } from './expense-entry.service';

describe('ExpenseEntryService', () => {
  let service: ExpenseEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseEntryService],
    }).compile();

    service = module.get<ExpenseEntryService>(ExpenseEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
