import { Module } from '@nestjs/common';
import { ReimbursementService } from './reimbursement.service';
import { ReimbursementController } from './reimbursement.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, ReimbursementService],
  controllers: [ReimbursementController],
})
export class ReimbursementModule {}
