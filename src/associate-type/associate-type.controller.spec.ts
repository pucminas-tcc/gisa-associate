import { Test, TestingModule } from '@nestjs/testing';
import { AssociateTypeController } from './associate-type.controller';

describe('AssociateTypeController', () => {
  let controller: AssociateTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateTypeController],
    }).compile();

    controller = module.get<AssociateTypeController>(AssociateTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
