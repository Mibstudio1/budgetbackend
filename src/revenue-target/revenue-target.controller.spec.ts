import { Test, TestingModule } from '@nestjs/testing';
import { RevenueTargetController } from './revenue-target.controller';
import { RevenueTargetService } from './revenue-target.service';

describe('RevenueTargetController', () => {
  let controller: RevenueTargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueTargetController],
      providers: [RevenueTargetService],
    }).compile();

    controller = module.get<RevenueTargetController>(RevenueTargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
