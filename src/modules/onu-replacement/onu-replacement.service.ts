import { prisma } from '../../config/prisma'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'

import { ReplaceOnuDto } from './onu-replacement.types'

export async function getOnuReplacements() {
  return prisma.onuReplacement.findMany({
    include: {
      endpoint: {
        select: {
          id: true,
          internetNo: true,
          name: true,
          address: true
        }
      },
      oldOnu: {
        select:{
          onuId: true,
          onuMac: true,
          onuName: true,
          model: true
        }
      },
      newOnu: {
        select: {
          onuId: true,
          onuMac: true,
          onuName: true,
          model: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getOnuReplacementById(id: string) {
  return prisma.onuReplacement.findUnique({
    where: {id},
    include: {
      endpoint: {
        select:{
          id: true,
          internetNo: true,
          name: true,
          address: true
        }
      },
      oldOnu: {
        select:{
          onuId: true,
          onuMac: true,
          onuName: true,
          model: true
        }
      },
      newOnu: {
        select:{
          onuId: true,
          onuMac: true,
          onuName: true,
          model: true
        }
      }
    }
  })
}

export async function replaceOnu(
  data: ReplaceOnuDto
) {

  const endpoint = await prisma.endpoint.findUnique({

      where: {
        id: data.endpointId
      },

      include: {
        onus: {
          where: {
            isActive: true
          },

          include: {
            olt: {
                select: {
                    id: true,
                    name: true,
                    vendor: true,
                    ipAddress: true,
                    telnetPort: true,
                    username: true,
                    password: true
                }
            }
          }
        }
      }
    })

  if (!endpoint) {

    return {
        success: false,
        message: 'endpoint ID tidak ditemukan',
        data: null
    }
  }

  const oldOnu = endpoint.onus[0]

  if (!oldOnu) {

    return {
        success: false,
        message: 'ONU tidak ditemukan',
        data: null
    }
  }

  const unauthorized =
    await prisma.unauthorizedOnu.findUnique({

      where: {
        id: data.unauthorizedOnuId
      }
    })

  if (!unauthorized) {

    return {
        success: false,
        message: 'Unauthorize ONU tidak ditemukan',
        data: null
    }
  }

  const transport = new TelnetTransport()
  await transport.connect({
    host: oldOnu.olt.ipAddress,
    port: oldOnu.olt.telnetPort
  })
  const session = new TelnetSession(transport)
  await session.login({
    username: oldOnu.olt.username,
    password: oldOnu.olt.password
  })

  const adapter = new HisfocusAdapter(session)

  //cari info onu baru
  const infoNewOnu = await adapter.getCompleteOnuInfo(
    unauthorized.eponPort,
    unauthorized.onuId
  )

  //ganti nama onu baru sesuai endpoin lama
  const normalizedName = endpoint.name.toLowerCase().replaceAll(' ', '_')
    await adapter.renameOnu(
        unauthorized.eponPort,
        unauthorized.onuId,
        normalizedName
    )


  //hapus onu dari olt
  await adapter.deleteOnu(
    oldOnu.eponPort,
    oldOnu.onuId
  )

  //save config ke olt
  await adapter.saveConfig()

  //disconnect telnet trasport
  await transport.disconnect()

  //prisma transaction
  const result = await prisma.$transaction(
    async tx => {
        await tx.onu.update({
            where: {id: oldOnu.id},
            data: {
                isActive: false,
                status: 'REPLACED'
            }
        })

        const newOnu = await tx.onu.create({
            data: {
                oltId: oldOnu.oltId,
                endpointId: endpoint.id,
                packageId: oldOnu.packageId,
                onuId: unauthorized.onuId,
                eponPort: unauthorized.eponPort,
                onuMac: unauthorized.macAddress,
                onuName: endpoint.name,
                onuComtName: unauthorized.onuComtName,
                onuType: infoNewOnu.onu.onu_type,
                model: infoNewOnu.onu.model_string,
                firmware: infoNewOnu.onu.firmware_version,
                status: 'ACTIVE',
                connectionState: infoNewOnu.onu.connectionState,
                temperature: infoNewOnu.optical?.temperature,
                voltage: infoNewOnu.optical?.voltage,
                txBias: infoNewOnu.optical?.txbias,
                txPower: infoNewOnu.optical?.txpower,
                rxPower: infoNewOnu.optical?.rxpower,
                isActive: true
            }
        })
        await tx.onuReplacement.create({
            data: {
                endpointId: endpoint.id,
                oldOnuId: oldOnu.id,
                newOnuId: newOnu.id,
                reason: data.reason
            }
        })

        await tx.unauthorizedOnu.delete({
            where: { id: unauthorized.id }
        })
        return newOnu
    }
  )

  return {
    success: true,
    message: 'ONU berhasil diganti',
    data: {
            internetNo: endpoint.internetNo,
            oldOnuMac: oldOnu.onuMac,
            newOnuMac: result.onuMac,
            port: `${result.eponPort}:${result.onuId}`
        }
    }
}