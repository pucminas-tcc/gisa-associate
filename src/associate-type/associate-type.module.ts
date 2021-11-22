import { Module } from '@nestjs/common';
import { AssociateTypeService } from './associate-type.service';
import { AssociateTypeController } from './associate-type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, AssociateTypeService],
  controllers: [AssociateTypeController],
})
export class AssociateTypeModule {}
