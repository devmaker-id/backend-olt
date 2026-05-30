-- CreateTable
CREATE TABLE "OnuEvent" (
    "id" TEXT NOT NULL,
    "onuId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "oldState" TEXT,
    "newState" TEXT,
    "source" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnuEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OnuEvent_onuId_idx" ON "OnuEvent"("onuId");

-- CreateIndex
CREATE INDEX "OnuEvent_event_idx" ON "OnuEvent"("event");

-- CreateIndex
CREATE INDEX "OnuEvent_createdAt_idx" ON "OnuEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "OnuEvent" ADD CONSTRAINT "OnuEvent_onuId_fkey" FOREIGN KEY ("onuId") REFERENCES "Onu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
