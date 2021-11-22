import { Injectable, Logger } from '@nestjs/common';
import { AssociateType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssociateTypeService {
  private readonly logger = new Logger(AssociateTypeService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AssociateTypeCreateInput): Promise<AssociateType> {
    return this.prisma.associateType.create({
      data,
    });
  }

  async associateType(
    data: Prisma.AssociateTypeWhereUniqueInput,
  ): Promise<AssociateType | null> {
    return this.prisma.associateType.findUnique({
      where: data,
    });
  }

  async associateTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssociateTypeWhereUniqueInput;
    where?: Prisma.AssociateTypeWhereInput;
    orderBy?: Prisma.AssociateTypeOrderByWithRelationInput;
  }): Promise<AssociateType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.associateType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.AssociateTypeWhereUniqueInput;
    data: Prisma.AssociateTypeUpdateInput;
  }): Promise<AssociateType> {
    const { where, data } = params;
    return this.prisma.associateType.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.AssociateTypeWhereUniqueInput,
  ): Promise<AssociateType> {
    return this.prisma.associateType.delete({
      where,
    });
  }
}
