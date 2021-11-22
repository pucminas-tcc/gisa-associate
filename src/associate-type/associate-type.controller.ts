import { Controller, Logger } from '@nestjs/common';
import { AssociateTypeService } from './associate-type.service';
import { AssociateType } from '@prisma/client';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AssociateTypeController {
  private readonly logger = new Logger(AssociateTypeController.name);

  constructor(private readonly associateTypeService: AssociateTypeService) {}

  @MessagePattern({ cmd: 'associate-type.create' })
  create(payload: any): Promise<AssociateType> {
    this.logger.log(payload);
    return this.associateTypeService.create(payload);
  }

  @MessagePattern({ cmd: 'associate-type.update' })
  update(payload: any) {
    const { id } = payload;
    return this.associateTypeService.update({ where: { id }, data: payload });
  }

  @MessagePattern({ cmd: 'associate-type.remove' })
  remove(payload: any) {
    const { id } = payload;
    return this.associateTypeService.delete({ id });
  }

  @MessagePattern({ cmd: 'associate-type.list' })
  list(payload: any) {
    const { id } = payload;
    return this.associateTypeService.associateType({ id });
  }

  @MessagePattern({ cmd: 'associate-type.all' })
  all(payload: any) {
    return this.associateTypeService.associateTypes(payload);
  }
}
