import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssociatePlanType, Prisma } from '@prisma/client';
import { calculatePlanValue } from 'src/utils/plan_value';

@Injectable()
export class AssociatePlanTypeService {
  private readonly logger = new Logger(AssociatePlanTypeService.name);

  constructor(private prisma: PrismaService) {}

  async create(data) {
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

    data = {
      ...data,
      finalPlanValue: await calculatePlanValue(baseValue, age),
    };

    return this.prisma.associatePlanType.create({
      data,
    });
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
    data: Prisma.AssociatePlanTypeUpdateInput;
  }): Promise<AssociatePlanType> {
    const { where, data } = params;
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
