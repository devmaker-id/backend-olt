-- CreateEnum
CREATE TYPE "SyslogEventType" AS ENUM ('ONU_LINKUP', 'ONU_LINKDOWN', 'ONU_LOS', 'ONU_DYING_GASP', 'ONU_REGISTER', 'ONU_UNREGISTER', 'WEB_LOGIN', 'WEB_LOGOUT', 'WEB_CONNECTION', 'WEB_DISCONNECTION', 'SYSTEM', 'UNKNOWN');

-- CreateTable
CREATE TABLE "SyslogEventLog" (
    "id" TEXT NOT NULL,
    "oltId" TEXT,
    "onuIdRef" TEXT,
    "type" "SyslogEventType" NOT NULL,
    "sourceIp" TEXT NOT NULL,
    "oltName" TEXT,
    "eponPort" TEXT,
    "onuId" TEXT,
    "onuMac" TEXT,
    "onuName" TEXT,
    "rawLog" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyslogEventLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SyslogEventLog_type_idx" ON "SyslogEventLog"("type");

-- CreateIndex
CREATE INDEX "SyslogEventLog_createdAt_idx" ON "SyslogEventLog"("createdAt");

-- CreateIndex
CREATE INDEX "SyslogEventLog_oltId_idx" ON "SyslogEventLog"("oltId");

-- CreateIndex
CREATE INDEX "SyslogEventLog_onuIdRef_idx" ON "SyslogEventLog"("onuIdRef");

-- CreateIndex
CREATE INDEX "SyslogEventLog_onuMac_idx" ON "SyslogEventLog"("onuMac");

-- AddForeignKey
ALTER TABLE "SyslogEventLog" ADD CONSTRAINT "SyslogEventLog_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyslogEventLog" ADD CONSTRAINT "SyslogEventLog_onuIdRef_fkey" FOREIGN KEY ("onuIdRef") REFERENCES "Onu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
