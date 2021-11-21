import { Module } from '@nestjs/common';
import { AssociateModule } from './associate/associate.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [AssociateModule, PlanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
