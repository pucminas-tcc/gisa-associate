-- CreateTable
CREATE TABLE "Associate" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Associate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociateType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AssociateType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "baseValue" DOUBLE PRECISION NOT NULL,
    "canEnableOdontological" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociatePlanType" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "associateId" TEXT NOT NULL,
    "associateTypeId" TEXT NOT NULL,
    "hasOdontologicalPlan" BOOLEAN NOT NULL DEFAULT false,
    "finalPlanValue" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "AssociatePlanType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssociatePlanType_planId_key" ON "AssociatePlanType"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "AssociatePlanType_associateId_key" ON "AssociatePlanType"("associateId");

-- CreateIndex
CREATE UNIQUE INDEX "AssociatePlanType_associateTypeId_key" ON "AssociatePlanType"("associateTypeId");

-- AddForeignKey
ALTER TABLE "AssociatePlanType" ADD CONSTRAINT "AssociatePlanType_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "Associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociatePlanType" ADD CONSTRAINT "AssociatePlanType_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociatePlanType" ADD CONSTRAINT "AssociatePlanType_associateTypeId_fkey" FOREIGN KEY ("associateTypeId") REFERENCES "AssociateType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
