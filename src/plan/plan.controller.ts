import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Plan } from '@prisma/client';
import { PlanService } from './plan.service';

@Controller()
export class PlanController {
  private readonly logger = new Logger(PlanController.name);

  constructor(private readonly planService: PlanService) {}

  @MessagePattern({ cmd: 'plan.create' })
  create(payload: any): Promise<Plan> {
    this.logger.log(payload);
    return this.planService.create(payload);
  }

  @MessagePattern({ cmd: 'plan.update' })
  update(payload: any) {
    const { id } = payload;
    return this.planService.update({ where: { id }, data: payload });
  }

  @MessagePattern({ cmd: 'plan.remove' })
  remove(payload: any) {
    const { id } = payload;
    return this.planService.delete({ id });
  }

  @MessagePattern({ cmd: 'plan.list' })
  list(payload: any) {
    const { id } = payload;
    return this.planService.plan({ id });
  }

  @MessagePattern({ cmd: 'plan.all' })
  all(payload: any) {
    return this.planService.plans(payload);
  }
}
