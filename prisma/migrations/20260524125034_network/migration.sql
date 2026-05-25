-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'TEKNISI');

-- CreateEnum
CREATE TYPE "OpticStatus" AS ENUM ('LINKUP', 'LINKDOWN');

-- CreateEnum
CREATE TYPE "OnuStatus" AS ENUM ('UNVERIFIED', 'ACTIVE', 'SUSPEND');

-- CreateEnum
CREATE TYPE "ConnectionState" AS ENUM ('ONLINE', 'OFFLINE', 'ONU_POWER_OFF', 'FIBER_LOS', 'ONU_AUTH_FAILED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "EndpointType" AS ENUM ('CUSTOMER', 'RESELLER', 'POP', 'BACKHAUL');

-- CreateEnum
CREATE TYPE "AlarmType" AS ENUM ('ONU_LINKUP', 'ONU_LINKDOWN', 'ONU_UNREGISTERED', 'ONU_LOS', 'ONU_DYING_GASP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TEKNISI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Olt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "syslogName" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "telnetPort" INTEGER NOT NULL DEFAULT 23,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Olt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Onu" (
    "id" TEXT NOT NULL,
    "oltId" TEXT NOT NULL,
    "endpointId" TEXT,
    "packageId" TEXT,
    "onuId" TEXT NOT NULL,
    "eponPort" TEXT NOT NULL,
    "onuMac" TEXT NOT NULL,
    "onuName" TEXT,
    "onuType" TEXT,
    "model" TEXT,
    "firmware" TEXT,
    "status" "OnuStatus",
    "connectionState" "ConnectionState",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Onu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL,
    "type" "EndpointType" NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "normalDevice" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnauthorizedOnu" (
    "id" TEXT NOT NULL,
    "oltId" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "eponPort" TEXT NOT NULL,
    "onuId" TEXT NOT NULL,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnauthorizedOnu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlarmLog" (
    "id" TEXT NOT NULL,
    "oltId" TEXT NOT NULL,
    "onuIdRef" TEXT,
    "type" "AlarmType" NOT NULL,
    "message" TEXT NOT NULL,
    "rawLog" TEXT NOT NULL,
    "sourceIp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlarmLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramLog" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelegramLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Olt_name_key" ON "Olt"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Olt_syslogName_key" ON "Olt"("syslogName");

-- CreateIndex
CREATE UNIQUE INDEX "Olt_ipAddress_key" ON "Olt"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Onu_onuMac_key" ON "Onu"("onuMac");

-- CreateIndex
CREATE INDEX "Onu_oltId_idx" ON "Onu"("oltId");

-- CreateIndex
CREATE INDEX "Onu_endpointId_idx" ON "Onu"("endpointId");

-- CreateIndex
CREATE INDEX "Onu_onuMac_idx" ON "Onu"("onuMac");

-- CreateIndex
CREATE INDEX "Onu_connectionState_idx" ON "Onu"("connectionState");

-- CreateIndex
CREATE UNIQUE INDEX "Onu_oltId_eponPort_onuId_key" ON "Onu"("oltId", "eponPort", "onuId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_code_key" ON "Endpoint"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UnauthorizedOnu_macAddress_key" ON "UnauthorizedOnu"("macAddress");

-- CreateIndex
CREATE INDEX "AlarmLog_type_idx" ON "AlarmLog"("type");

-- CreateIndex
CREATE INDEX "AlarmLog_createdAt_idx" ON "AlarmLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnauthorizedOnu" ADD CONSTRAINT "UnauthorizedOnu_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_onuIdRef_fkey" FOREIGN KEY ("onuIdRef") REFERENCES "Onu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
