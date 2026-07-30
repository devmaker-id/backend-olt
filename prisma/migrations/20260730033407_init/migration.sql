-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'TEKNISI');

-- CreateEnum
CREATE TYPE "OltPlatform" AS ENUM ('HIOSO', 'VSOL');

-- CreateEnum
CREATE TYPE "OltConnectionType" AS ENUM ('TELNET', 'SSH', 'API', 'SNMP');

-- CreateEnum
CREATE TYPE "OpticStatus" AS ENUM ('LINKUP', 'LINKDOWN');

-- CreateEnum
CREATE TYPE "OnuStatus" AS ENUM ('UNVERIFIED', 'ACTIVE', 'SUSPEND', 'REPLACED');

-- CreateEnum
CREATE TYPE "ConnectionState" AS ENUM ('ONLINE', 'OFFLINE', 'ONU_POWER_OFF', 'FIBER_LOS', 'ONU_AUTH_FAILED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "EndpointType" AS ENUM ('CUSTOMER', 'RESELLER', 'POP', 'BACKHAUL');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('HOTSPOT', 'PPP');

-- CreateEnum
CREATE TYPE "AlarmType" AS ENUM ('ONU_LINKUP', 'ONU_LINKDOWN', 'ONU_UNREGISTERED', 'ONU_LOS', 'ONU_DYING_GASP');

-- CreateEnum
CREATE TYPE "TelegramRole" AS ENUM ('ADMIN', 'TEKNISI');

-- CreateEnum
CREATE TYPE "SyslogEventType" AS ENUM ('ONU_LINKUP', 'ONU_LINKDOWN', 'ONU_ONLINE', 'ONU_OFFLINE', 'ONU_REGISTER', 'ONU_UNREGISTER', 'ONU_LOS', 'ONU_DYING_GASP', 'WEB_LOGIN', 'WEB_LOGOUT', 'SSH_LOGIN', 'SSH_LOGOUT', 'WEB_CONNECTION', 'WEB_DISCONNECTION', 'SYSTEM', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TEKNISI',
    "email" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Olt" (
    "id" TEXT NOT NULL,
    "telegramBotId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "syslogName" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "managementPort" INTEGER NOT NULL DEFAULT 23,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "platform" "OltPlatform" NOT NULL,
    "connectionType" "OltConnectionType" NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Olt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Onu" (
    "id" TEXT NOT NULL,
    "oltId" TEXT NOT NULL,
    "endpointId" TEXT,
    "onuId" TEXT NOT NULL,
    "portId" TEXT NOT NULL,
    "serialNumber" TEXT,
    "onuMac" TEXT,
    "onuName" TEXT,
    "onuComtName" TEXT,
    "onuType" TEXT,
    "model" TEXT,
    "firmware" TEXT,
    "status" "OnuStatus",
    "connectionState" "ConnectionState",
    "temperature" TEXT,
    "voltage" TEXT,
    "txBias" TEXT,
    "txPower" TEXT,
    "rxPower" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Onu_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL,
    "type" "EndpointType" NOT NULL,
    "internetNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "description" TEXT,
    "packageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "type" "PackageType" NOT NULL,
    "name" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "normalDevice" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnauthorizedOnu" (
    "id" TEXT NOT NULL,
    "oltId" TEXT NOT NULL,
    "onuComtName" TEXT,
    "onuName" TEXT,
    "status" TEXT,
    "serialNumber" TEXT,
    "macAddress" TEXT,
    "portId" TEXT,
    "onuId" TEXT,
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

-- CreateTable
CREATE TABLE "TelegramBot" (
    "id" TEXT NOT NULL,
    "telegramBotId" TEXT,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "token" TEXT NOT NULL,
    "webhookUrl" TEXT,
    "defaultChatId" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramBot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT,
    "fullName" TEXT,
    "role" "TelegramRole" NOT NULL DEFAULT 'TEKNISI',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "telegramBotId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramAccessLog" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "message" TEXT,
    "chatType" TEXT,
    "isAuthorized" BOOLEAN NOT NULL,
    "telegramBotId" TEXT,
    "rawUpdate" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelegramAccessLog_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "SyslogEventLog" (
    "id" TEXT NOT NULL,
    "oltId" TEXT,
    "onuIdRef" TEXT,
    "type" "SyslogEventType" NOT NULL,
    "sourceIp" TEXT NOT NULL,
    "oltName" TEXT,
    "portId" TEXT,
    "onuId" TEXT,
    "onuMac" TEXT,
    "serialNumber" TEXT,
    "onuName" TEXT,
    "rawLog" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyslogEventLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Olt_ipAddress_key" ON "Olt"("ipAddress");

-- CreateIndex
CREATE INDEX "Onu_oltId_idx" ON "Onu"("oltId");

-- CreateIndex
CREATE INDEX "Onu_endpointId_idx" ON "Onu"("endpointId");

-- CreateIndex
CREATE INDEX "Onu_connectionState_idx" ON "Onu"("connectionState");

-- CreateIndex
CREATE UNIQUE INDEX "Onu_oltId_portId_onuId_key" ON "Onu"("oltId", "portId", "onuId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_internetNo_key" ON "Endpoint"("internetNo");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_email_key" ON "Endpoint"("email");

-- CreateIndex
CREATE INDEX "AlarmLog_type_idx" ON "AlarmLog"("type");

-- CreateIndex
CREATE INDEX "AlarmLog_createdAt_idx" ON "AlarmLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_telegramId_key" ON "TelegramUser"("telegramId");

-- CreateIndex
CREATE INDEX "OnuEvent_onuId_idx" ON "OnuEvent"("onuId");

-- CreateIndex
CREATE INDEX "OnuEvent_event_idx" ON "OnuEvent"("event");

-- CreateIndex
CREATE INDEX "OnuEvent_createdAt_idx" ON "OnuEvent"("createdAt");

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
ALTER TABLE "Olt" ADD CONSTRAINT "Olt_telegramBotId_fkey" FOREIGN KEY ("telegramBotId") REFERENCES "TelegramBot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onu" ADD CONSTRAINT "Onu_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnuReplacement" ADD CONSTRAINT "OnuReplacement_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnuReplacement" ADD CONSTRAINT "OnuReplacement_oldOnuId_fkey" FOREIGN KEY ("oldOnuId") REFERENCES "Onu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnuReplacement" ADD CONSTRAINT "OnuReplacement_newOnuId_fkey" FOREIGN KEY ("newOnuId") REFERENCES "Onu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnauthorizedOnu" ADD CONSTRAINT "UnauthorizedOnu_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_onuIdRef_fkey" FOREIGN KEY ("onuIdRef") REFERENCES "Onu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_telegramBotId_fkey" FOREIGN KEY ("telegramBotId") REFERENCES "TelegramBot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramAccessLog" ADD CONSTRAINT "TelegramAccessLog_telegramBotId_fkey" FOREIGN KEY ("telegramBotId") REFERENCES "TelegramBot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnuEvent" ADD CONSTRAINT "OnuEvent_onuId_fkey" FOREIGN KEY ("onuId") REFERENCES "Onu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyslogEventLog" ADD CONSTRAINT "SyslogEventLog_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "Olt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyslogEventLog" ADD CONSTRAINT "SyslogEventLog_onuIdRef_fkey" FOREIGN KEY ("onuIdRef") REFERENCES "Onu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
