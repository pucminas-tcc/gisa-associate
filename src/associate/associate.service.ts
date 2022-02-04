import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Associate, Prisma } from '@prisma/client';
import { callSAFService } from 'src/utils/legacy_systems';

@Injectable()
export class AssociateService {
  private readonly logger = new Logger(AssociateService.name);

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.AssociateCreateInput): Promise<Associate> {
    return this.prisma.associate.create({
      data,
    });
  }

  async associate(
    associateWhereUniqueInput: Prisma.AssociateWhereUniqueInput,
  ): Promise<Associate | null> {
    return this.prisma.associate.findUnique({
      where: associateWhereUniqueInput,
    });
  }

  async isAssociateActive(
    associateWhereUniqueInput: Prisma.AssociateWhereUniqueInput,
  ): Promise<any | null> {
    const associate = this.prisma.associate.findUnique({
      where: associateWhereUniqueInput,
    });

    // Implementar validação com a base do serviço para o sistema SAF
    return { "isActive": (await associate).isActive == callSAFService({}) };
  }

  async associates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssociateWhereUniqueInput;
    where?: Prisma.AssociateWhereInput;
    orderBy?: Prisma.AssociateOrderByWithRelationInput;
  }): Promise<Associate[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.associate.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.AssociateWhereUniqueInput;
    data: Prisma.AssociateUpdateInput;
  }): Promise<Associate> {
    const { where, data } = params;
    return this.prisma.associate.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AssociateWhereUniqueInput): Promise<Associate> {
    return this.prisma.associate.delete({
      where,
    });
  }
}
