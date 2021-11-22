import { Test, TestingModule } from '@nestjs/testing';
import { AssociatePlanTypeService } from './associate-plan-type.service';

describe('AssociatePlanTypeService', () => {
  let service: AssociatePlanTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociatePlanTypeService],
    }).compile();

    service = module.get<AssociatePlanTypeService>(AssociatePlanTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
