import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Plan, Prisma } from '@prisma/client';

@Injectable()
export class PlanService {
  private readonly logger = new Logger(PlanService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PlanCreateInput): Promise<Plan> {
    return this.prisma.plan.create({
      data,
    });
  }

  async plan(
    planWhereUniqueInput: Prisma.PlanWhereUniqueInput,
  ): Promise<Plan | null> {
    return this.prisma.plan.findUnique({
      where: planWhereUniqueInput,
    });
  }

  async plans(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlanWhereUniqueInput;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput;
  }): Promise<Plan[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.plan.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.PlanWhereUniqueInput;
    data: Prisma.PlanUpdateInput;
  }): Promise<Plan> {
    const { where, data } = params;
    return this.prisma.plan.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PlanWhereUniqueInput): Promise<Plan> {
    return this.prisma.plan.delete({
      where,
    });
  }
}
