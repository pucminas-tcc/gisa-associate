import { Module } from '@nestjs/common';
import { AssociateModule } from './associate/associate.module';
import { PlanModule } from './plan/plan.module';
import { AssociateTypeModule } from './associate-type/associate-type.module';
import { AssociatePlanTypeModule } from './associate-plan-type/associate-plan-type.module';

@Module({
  imports: [
    AssociateModule,
    PlanModule,
    AssociateTypeModule,
    AssociatePlanTypeModule,
  ],
})
export class AppModule {}
