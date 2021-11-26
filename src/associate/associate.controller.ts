import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AssociateService } from './associate.service';
import { Associate } from '@prisma/client';

@Controller()
export class AssociateController {
  private readonly logger = new Logger(AssociateController.name);

  constructor(private readonly associateService: AssociateService) {}

  @MessagePattern({ cmd: 'associate.create' })
  create(payload: any): Promise<Associate> {
    this.logger.log(payload);
    return this.associateService.create(payload);
  }

  @MessagePattern({ cmd: 'associate.update' })
  update(payload: any) {
    const { id } = payload;
    return this.associateService.update({ where: { id }, data: payload });
  }

  @MessagePattern({ cmd: 'associate.remove' })
  remove(payload: any) {
    const { id } = payload;
    return this.associateService.delete({ id });
  }

  @MessagePattern({ cmd: 'associate.list' })
  list(payload: any) {
    const { id } = payload;
    return this.associateService.associate({ id });
  }

  @MessagePattern({ cmd: 'associate.all' })
  all(payload: any) {
    return this.associateService.associates(payload);
  }

  @MessagePattern({ cmd: 'associate.is-active' })
  isAssociateActive(payload: any) {
    const { id } = payload;
    return this.associateService.isAssociateActive({ id });
  }
}
