import { prisma } from '../../config/prisma'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import {
  AuthorizeOnuDto,
  AuthorizeOnuResult
} from './onu.types'
import {
  validateUnauthorizedOnu,
  validateExistingOnu
 } from './onu.validation'
import { normalizeOnuName } from '../../utils/normalize-onu'
import { generateInternetNo } from '../../utils/generate-internet-no'

export async function authorizeOnu(
  data: AuthorizeOnuDto
): Promise<AuthorizeOnuResult> {

  const unauthorized = await validateUnauthorizedOnu( data.macAddress )
  if(!unauthorized.success) {
    return {
      success: false,
      message: unauthorized.message,
      data: null
    }
  }

  const olt = await prisma.olt.findUnique({
      where: {
        id: unauthorized.data?.oltId
      }
    })

  if (!olt) {
    return {
      success: false,
      message: 'OLT_NOT_FOUND',
      data: null
    }
  }

  await validateExistingOnu(
    unauthorized.data?.oltId!,
    unauthorized.data?.eponPort!,
    unauthorized.data?.onuId!
  )

  const transport = new TelnetTransport()

  await transport.connect({
    host: olt.ipAddress,
    port: olt.managementPort
  })
  const session = new TelnetSession(transport)
  await session.login({
    username: olt.username,
    password: olt.password
  })

  const adapter = new HisfocusAdapter(session)

  try {
    const normalizedName =
      normalizeOnuName(
        data.endpoint.name
      )
    await adapter.renameOnu(
      unauthorized.data?.eponPort!,
      unauthorized.data?.onuId!,
      normalizedName
    )
    await adapter.saveConfig()

    const profile = await adapter.getCompleteOnuInfo(
        unauthorized.data?.eponPort!,
        unauthorized.data?.onuId!
      )
    
    const result =
      await prisma.$transaction(
        async tx => {
          const internetNo = await generateInternetNo()
          const endpoint =
            await tx.endpoint.create({
              data: {
                internetNo,
                type: data.endpoint.type,
                name: data.endpoint.name,
                code: data.endpoint.code,
                address: data.endpoint.address,
                description: data.endpoint.description,
                latitude: data.endpoint.latitude,
                longitude: data.endpoint.longitude
              }
            })

          const onu =
            await tx.onu.create({
              data: {
                oltId: olt.id,
                endpointId: endpoint.id,
                packageId: data.packageId,
                onuMac: data.macAddress,
                eponPort: unauthorized.data?.eponPort!,
                onuId: unauthorized.data?.onuId!,
                onuName: data.endpoint.name,
                onuComtName: unauthorized.data?.onuComtName,
                onuType: profile.onu.onu_type,
                model: profile.onu.model_string,
                firmware: profile.onu.firmware_version,
                status: 'ACTIVE',
                connectionState: profile.onu.connectionState,
                temperature: profile.optical?.temperature,
                voltage: profile.optical?.voltage,
                txBias: profile.optical?.txbias,
                txPower: profile.optical?.txpower,
                rxPower: profile.optical?.rxpower
              }
            })

          await tx.unauthorizedOnu
            .delete({
              where: {
                macAddress: data.macAddress
              }
            })

          return {
            success: true,
            message: 'ONU BERHAIL DI REGISTRASI',
            data: {
              internetNo: endpoint.internetNo,
              name: endpoint.name,
              type: endpoint.type,
              macAddress: onu.onuMac,
              port: `${onu.eponPort}:${onu.onuId}`
            }
          }
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