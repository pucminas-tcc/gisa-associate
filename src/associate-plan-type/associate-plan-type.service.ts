import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssociatePlanType, Prisma } from '@prisma/client';
import { calculatePlanValue } from 'src/utils/plan_value';

@Injectable()
export class AssociatePlanTypeService {
  private readonly logger = new Logger(AssociatePlanTypeService.name);

  constructor(private prisma: PrismaService) {}

  async create(data) {
    const planValueAfterCalculus = await this.reajustPlanValue(data);

    data = {
      ...data,
      finalPlanValue: planValueAfterCalculus,
    };

    return this.prisma.associatePlanType.create({
      data,
    });
  }

  private async reajustPlanValue(data: any) {
    const { associateId, planId } = data;

    const associate_info = await this.prisma.associate.findUnique({
      where: { id: associateId },
    });

    const plan_info = await this.prisma.plan.findUnique({
      where: { id: planId },
    });

    if (associate_info == null || plan_info == null) {
      throw new HttpException(
        'Failed to process data.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { age } = associate_info;
    const { baseValue } = plan_info;
    let planValueAfterCalculus = await calculatePlanValue(baseValue, age);

    if (data.hasOdontologicalPlan && plan_info.name != 'VIP') {
      planValueAfterCalculus = planValueAfterCalculus * 0.15;
    }
    return planValueAfterCalculus;
  }

  async associatePlanType(
    data: Prisma.AssociatePlanTypeWhereUniqueInput,
  ): Promise<AssociatePlanType | null> {
    return this.prisma.associatePlanType.findUnique({
      where: data,
    });
  }

  async associatePlanTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssociatePlanTypeWhereUniqueInput;
    where?: Prisma.AssociatePlanTypeWhereInput;
    orderBy?: Prisma.AssociatePlanTypeOrderByWithRelationInput;
  }): Promise<AssociatePlanType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.associatePlanType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.AssociatePlanTypeWhereUniqueInput;
    data;
  }): Promise<AssociatePlanType> {
    const { where } = params;
    let { data } = params;

    const planValueAfterCalculus = await this.reajustPlanValue(data);

    data = {
      ...data,
      finalPlanValue: planValueAfterCalculus,
    };

    return this.prisma.associatePlanType.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.AssociatePlanTypeWhereUniqueInput,
  ): Promise<AssociatePlanType> {
    return this.prisma.associatePlanType.delete({
      where,
    });
  }
}
