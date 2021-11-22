import { Test, TestingModule } from '@nestjs/testing';
import { AssociatePlanTypeController } from './associate-plan-type.controller';

describe('AssociatePlanTypeController', () => {
  let controller: AssociatePlanTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatePlanTypeController],
    }).compile();

    controller = module.get<AssociatePlanTypeController>(AssociatePlanTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
