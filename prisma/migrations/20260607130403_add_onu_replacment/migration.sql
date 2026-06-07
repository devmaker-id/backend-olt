-- CreateTable
CREATE TABLE "OnuReplacement" (
    "id" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    "oldOnuId" TEXT NOT NULL,
    "newOnuId" TEXT NOT NULL,
    "reason" TEXT,
    "replacedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnuReplacement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnuReplacement" ADD CONSTRAINT "OnuReplacement_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnuReplacement" ADD CONSTRAINT "OnuReplacement_oldOnuId_fkey" FOREIGN KEY ("oldOnuId") REFERENCES "Onu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnuReplacement" ADD CONSTRAINT "OnuReplacement_newOnuId_fkey" FOREIGN KEY ("newOnuId") REFERENCES "Onu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
