import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function getAssociateData(): Promise<Prisma.AssociateCreateInput[]> {
  return [
    {
      accountId: '09c2d41f-d2b7-4f00-b21c-1601b8d2527c',
      firstName: 'Rodolfo',
      age: 25,
      middleName: '',
      lastName: 'Olivieri',
      isActive: true,
    },
  ];
}

async function getAssociateTypeData(): Promise<
  Prisma.AssociateTypeCreateInput[]
> {
  return [
    {
      name: 'Individual',
      description: 'Plano destinado a um único usuário',
    },
    {
      name: 'Empresarial',
      description: 'Plano destinado a funcionários de uma empresa.',
    },
  ];
}

async function getPlanData(): Promise<Prisma.PlanCreateInput[]> {
  return [
    {
      name: 'Enfermaria',
      description: 'Plano básico. Possui co-participação.',
      baseValue: 200.0,
    },
    {
      name: 'Apartamento',
      description: 'Plano intermediário. Não possui co-participação.',
      baseValue: 400.0,
      canEnableOdontological: true,
    },
    {
      name: 'VIP',
      description:
        'Plano avançado. Inclui diversos serviços e atendimentos. Sem co-participação.',
      baseValue: 1000.0,
      canEnableOdontological: true,
    },
  ];
}

async function main() {
  console.log(`Start seeding plan data ...`);

  const planData = await getPlanData();
  for (const data of planData) {
    const plan = await prisma.plan.create({
      data: data,
    });
    console.log(`Created plan '${plan.name}' with id: ${plan.id}`);
  }

  console.log(`Start seeding associate data ...`);

  const associateData = await getAssociateData();

  for (const data of associateData) {
    const associate = await prisma.associate.create({
      data: data,
    });
    console.log(
      `Created associate '${associate.firstName}' with id: ${associate.id}`,
    );
  }

  console.log(`Start seeding associate type data ...`);

  const associateTypeData = await getAssociateTypeData();

  for (const data of associateTypeData) {
    const associateType = await prisma.associateType.create({
      data: data,
    });
    console.log(
      `Created associateType '${associateType.name}' with id: ${associateType.id}`,
    );
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
