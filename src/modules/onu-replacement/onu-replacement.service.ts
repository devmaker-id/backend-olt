import { OltConnectionType, OltPlatform } from '@prisma/client'
import { prisma } from '../../config/prisma'
import { NotFoundError } from '../../core/errors/not-found.error'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'

import { replacementSchemaDto } from './shcemas/replacement.schema'
import { ForbiddenError } from '../../core/errors/forbidden.error'

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
  data: replacementSchemaDto
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
                    connectionType: true,
                    platform: true,
                    ipAddress: true,
                    managementPort: true,
                    username: true,
                    password: true
                }
            }
          }
        }
      }
    })

  if (!endpoint) {
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND'
    )
  }

  const oldOnu = endpoint.onus[0]

  if (!oldOnu) {

    throw new NotFoundError(
      'OLT_NOT_FOUND'
    )
  }

  const unauthorized = await prisma.unauthorizedOnu.findUnique({

      where: {
        id: data.unauthorizedOnuId
      }
    })

  if (!unauthorized) {

    throw new NotFoundError(
      'UNAUTHORIZE_ONU_NOT_FOUND'
    )
  }
  if (!unauthorized.portId) {

    throw new NotFoundError(
      'PORTID_NOT_FOUND'
    )
  }
  if (!unauthorized.onuId) {

    throw new NotFoundError(
      'ONUID_NOT_FOUND'
    )
  }


  if(oldOnu.olt.connectionType === OltConnectionType.TELNET){
    if(oldOnu.olt.platform === OltPlatform.HIOSO){
      const transport = new TelnetTransport()
      await transport.connect({
        host: oldOnu.olt.ipAddress,
        port: oldOnu.olt.managementPort
      })
      const session = new TelnetSession(transport)
      await session.login({
        username: oldOnu.olt.username,
        password: oldOnu.olt.password
      })

      const adapter = new HisfocusAdapter(session)

      //cari info onu baru
      const infoNewOnu = await adapter.getCompleteOnuInfo(
        unauthorized.portId,
        unauthorized.onuId
      )

      //ganti nama onu baru sesuai endpoin lama
      const normalizedName = endpoint.name.toLowerCase().replaceAll(' ', '_')
        await adapter.renameOnu(
            unauthorized.portId,
            unauthorized.onuId,
            normalizedName
        )


      //hapus onu dari olt
      await adapter.deleteOnu(
        oldOnu.portId,
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
                    onuId: unauthorized.onuId!,
                    portId: unauthorized.portId!,
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
        internetNo: endpoint.internetNo,
        oldOnuMac: oldOnu.onuMac,
        newOnuMac: result.onuMac,
        port: `${result.portId}:${result.onuId}`
      }
    }
    throw new ForbiddenError(
      'IS_DEVELOPMENT_SORRY'
    )
  }
  throw new ForbiddenError(
    'IS_DEVELOPMENT_SORRY'
  )
}