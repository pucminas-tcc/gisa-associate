import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function getPlanData(): Promise<Prisma.PlanCreateInput[]> {
  return [
    {
      name: 'Enfermaria',
      description: 'Plano básico. Possui co-participação.',
      value: 200.0,
    },
    {
      name: 'Apartamento',
      description: 'Plano intermediário. Não possui co-participação.',
      value: 400.0,
    },
    {
      name: 'VIP',
      description:
        'Plano avançado. Inclui diversos serviços e atendimentos. Sem co-participação.',
      value: 1000.0,
    },
  ];
}

async function getAssociateData(): Promise<Prisma.AssociateCreateInput[]> {
  const plan = await prisma.plan.findFirst({ where: { name: 'VIP' } });
  return [
    {
      accountId: '09c2d41f-d2b7-4f00-b21c-1601b8d2527c',
      firstName: 'Rodolfo',
      middleName: '',
      lastName: 'Sivieri',
      isActive: true,
      hasDentalPlan: true,
      plan: {
        connect: {
          id: plan.id,
        },
      },
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
