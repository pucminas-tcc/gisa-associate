import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssociatePlanTypeController } from './associate-plan-type.controller';
import { AssociatePlanTypeService } from './associate-plan-type.service';

@Module({
  controllers: [AssociatePlanTypeController],
  providers: [PrismaService, AssociatePlanTypeService],
})
export class AssociatePlanTypeModule {}
