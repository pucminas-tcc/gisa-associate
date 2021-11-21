-- CreateTable
CREATE TABLE "Associate" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "age" INTEGER,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "hasDentalPlan" BOOLEAN NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "Associate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Associate_planId_key" ON "Associate"("planId");

-- AddForeignKey
ALTER TABLE "Associate" ADD CONSTRAINT "Associate_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
