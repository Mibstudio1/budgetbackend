import { Test, TestingModule } from '@nestjs/testing';
import { RevenueTargetService } from './revenue-target.service';

describe('RevenueTargetService', () => {
  let service: RevenueTargetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenueTargetService],
    }).compile();

    service = module.get<RevenueTargetService>(RevenueTargetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
