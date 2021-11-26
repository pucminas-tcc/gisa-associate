import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AssociatePlanTypeService } from './associate-plan-type.service';

@Controller()
export class AssociatePlanTypeController {
  private readonly logger = new Logger(AssociatePlanTypeController.name);

  constructor(
    private readonly associatePlanTypeService: AssociatePlanTypeService,
  ) {}

  @MessagePattern({ cmd: 'associate-plan-type.create' })
  create(payload: any) {
    this.logger.log(payload);
    return this.associatePlanTypeService.create(payload);
  }

  @MessagePattern({ cmd: 'associate-plan-type.update' })
  update(payload: any) {
    const { id } = payload;
    return this.associatePlanTypeService.update({
      where: { id },
      data: payload,
    });
  }

  @MessagePattern({ cmd: 'associate-plan-type.remove' })
  remove(payload: any) {
    const { id } = payload;
    return this.associatePlanTypeService.delete({ id });
  }

  @MessagePattern({ cmd: 'associate-plan-type.list' })
  list(payload: any) {
    const { id } = payload;
    return this.associatePlanTypeService.associatePlanType({ id });
  }

  @MessagePattern({ cmd: 'associate-plan-type.all' })
  all(payload: any) {
    return this.associatePlanTypeService.associatePlanTypes(payload);
  }
}
