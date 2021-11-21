import { Module } from '@nestjs/common';
import { AssociateService } from './associate.service';
import { AssociateController } from './associate.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AssociateService, PrismaService],
  controllers: [AssociateController],
})
export class AssociateModule {}
