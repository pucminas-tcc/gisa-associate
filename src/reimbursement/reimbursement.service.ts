import { Injectable, Logger } from '@nestjs/common';
import { Reimbursement, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReimbursementService {
  private readonly logger = new Logger(ReimbursementService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReimbursementCreateInput): Promise<Reimbursement> {
    return this.prisma.reimbursement.create({
      data,
    });
  }

  async reimbursement(
    data: Prisma.ReimbursementWhereUniqueInput,
  ): Promise<Reimbursement | null> {
    return this.prisma.reimbursement.findUnique({
      where: data,
    });
  }

  async reimbursements(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReimbursementWhereUniqueInput;
    where?: Prisma.ReimbursementWhereInput;
    orderBy?: Prisma.ReimbursementOrderByWithRelationInput;
  }): Promise<Reimbursement[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.reimbursement.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.ReimbursementWhereUniqueInput;
    data: Prisma.ReimbursementUpdateInput;
  }): Promise<Reimbursement> {
    const { where, data } = params;
    return this.prisma.reimbursement.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.ReimbursementWhereUniqueInput,
  ): Promise<Reimbursement> {
    return this.prisma.reimbursement.delete({
      where,
    });
  }
}
