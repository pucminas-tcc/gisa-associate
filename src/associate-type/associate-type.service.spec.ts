import { Test, TestingModule } from '@nestjs/testing';
import { AssociateTypeService } from './associate-type.service';

describe('AssociateTypeService', () => {
  let service: AssociateTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociateTypeService],
    }).compile();

    service = module.get<AssociateTypeService>(AssociateTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
