import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReimbursementService } from './reimbursement.service';
import { Reimbursement } from '@prisma/client';

@Controller()
export class ReimbursementController {
  private readonly logger = new Logger(ReimbursementController.name);

  constructor(private readonly reimbursementService: ReimbursementService) {}

  @MessagePattern({ cmd: 'reimbursement.create' })
  private create(payload: any): Promise<Reimbursement> {
    this.logger.log(payload);
    return this.reimbursementService.create(payload);
  }

  @MessagePattern({ cmd: 'reimbursement.update' })
  private update(payload: any) {
    const { id } = payload;
    return this.reimbursementService.update({ where: { id }, data: payload });
  }

  @MessagePattern({ cmd: 'reimbursement.remove' })
  private remove(payload: any) {
    const { id } = payload;
    return this.reimbursementService.delete({ id });
  }

  @MessagePattern({ cmd: 'reimbursement.list' })
  private list(payload: any) {
    const { id } = payload;
    return this.reimbursementService.reimbursement({ id });
  }

  @MessagePattern({ cmd: 'reimbursement.all' })
  private all(payload: any) {
    return this.reimbursementService.reimbursements(payload);
  }

  @MessagePattern({ cmd: 'reimbursement.acceptance' })
  private acceptReimbursement(payload: any) {
    return this.reimbursementService.acceptReimbursement(payload);
  }
}
