import { prisma } from '../../config/prisma'

import {
  TelnetTransport
} from '../../services/network/transport/telnet.transport'

import {
  HisfocusAdapter
} from '../../services/network/vendors/hisfocus/hisfocus.adapter'

import { AuthorizeOnuDto } from './onu.types'

import { validateUnauthorizedOnu } from './onu.validation'

import { normalizeOnuName } from '../../utils/normalize-onu-name'

export async function authorizeOnu(
  data: AuthorizeOnuDto
) {

  const unauthorized =
    await validateUnauthorizedOnu(
      data.macAddress
    )

  const olt =
    await prisma.olt.findUnique({
      where: {
        id:
          unauthorized.oltId
      }
    })

  if (!olt) {

    throw new Error(
      'OLT_NOT_FOUND'
    )
  }

  const transport =
    new TelnetTransport()

  await transport.connect({
    host:
      olt.ipAddress,

    port:
      olt.telnetPort,

    username:
      olt.username,

    password:
      olt.password
  })

  const adapter =
    new HisfocusAdapter(
      transport
    )

  try {

    const normalizedName =
      normalizeOnuName(
        data.endpoint.name
      )

    await adapter.renameOnu(

      unauthorized.eponPort,

      unauthorized.onuId,

      normalizedName
    )

    const profile =
      await adapter.getCompleteOnuInfo(

        unauthorized.eponPort,

        unauthorized.onuId
      )

    console.log(
      'ONU PROFILE',
      profile.onu
    )
    
    const result =
      await prisma.$transaction(

        async tx => {

          const endpoint =
            await tx.endpoint.create({
              data: {

                type: data.endpoint.type,

                name:
                  data.endpoint.name,

                code:
                  data.endpoint.code,

                address:
                  data.endpoint.address,

                description:
                  data.endpoint.description,

                latitude:
                  data.endpoint.latitude,

                longitude:
                  data.endpoint.longitude
              }
            })

          const onu =
            await tx.onu.create({
              data: {

                oltId:
                  unauthorized.oltId,

                endpointId:
                  endpoint.id,

                packageId:
                  data.packageId,

                onuMac:
                  unauthorized.macAddress,

                eponPort:
                  unauthorized.eponPort,

                onuId:
                  unauthorized.onuId,

                onuName:
                  profile.onu.onu_name,

                onuType:
                  profile.onu.onu_type,

                model:
                  profile.onu.model_string,

                firmware:
                  profile.onu.firmware_version,

                status:
                  'ACTIVE',

                connectionState:
                  profile.onu.connectionState
              }
            })

          await tx.unauthorizedOnu
            .delete({
              where: {
                macAddress:
                  data.macAddress
              }
            })

          return onu
        }
      )

    return result
  }

  finally {

    await transport.disconnect()
  }
}

export async function getUnauthorizedOnus() {

  return prisma.unauthorizedOnu
    .findMany({

      include: {
        olt: {
          select: {
            id: true,
            name: true,
            syslogName: true,
            vendor: true,
            location: true
          }
        }
      },

      orderBy: {
        discoveredAt: 'desc'
      }
    })
}