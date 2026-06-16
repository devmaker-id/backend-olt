import { prisma } from '../../config/prisma'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import { classifyRxPower } from '../../utils/classify-rx-power'

import { CreateEndpointDto } from './schemas/create-endpoint.schema'
import { UpdateEndpointDto } from './schemas/update-endpoint.schema'

import {
  validateUniqueInternetNo,
  validatePackageExists,
  validateEmailUnique,
} from './validation/endpoint.validation'

import { ENDPOINT_INCLUDE } from './endpoint-constants'

export async function createEndpoint(
  data: CreateEndpointDto
) {
  await validateUniqueInternetNo(
    data.internetNo
  )
  await validateEmailUnique(
    data.email
  )
  if(data.packageId) {
    await validatePackageExists(
      data.packageId
    )
  }
  
  return prisma.endpoint.create({
    data
  })
}

export async function getEndpoints() {

  return prisma.endpoint.findMany({
    include: ENDPOINT_INCLUDE,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getEndpointByInet(
  internetNo: string,
) {

  const endpoint = await prisma.endpoint.findUnique({
      where: {
        internetNo,
      },

      include: {
        package: true,

        onus: {
          include: {
            olt: true,
          },
        },
      },
    })

  if (!endpoint) {
    return null
  }

  if (endpoint.onus.length === 0) {
    return {
      internetNo: endpoint.internetNo,
      name: endpoint.name,
      type: endpoint.type,
      address: endpoint.address,
      package: endpoint.package,
      onus: [],
    }
  }
  const realtimeOnus = []
  for (const onu of endpoint.onus) {
    const transport = new TelnetTransport()
    try {
      await transport.connect({
        host: onu.olt.ipAddress,
        port: onu.olt.managementPort,
      })
      const session = new TelnetSession(
          transport
        )
      await session.login({
        username: onu.olt.username,
        password: onu.olt.password,
      })
      const adapter =
        new HisfocusAdapter(
          session
        )
      const realtime =
        await adapter.getCompleteOnuInfo(
          onu.eponPort,
          onu.onuId,
        )
      realtimeOnus.push({
        id: onu.id,
        olt: {
          id: onu.olt.id,
          name: onu.olt.name,
        },
        port: `${onu.eponPort}:${onu.onuId}`,
        name: realtime.onu.onu_name,
        status: realtime.onu.connectionState,
        signalStatus:
          classifyRxPower(
            realtime.optical?.rxpower,
          ),
        model: realtime.onu.model_string,
        rxPower: realtime.optical?.rxpower,
        txPower: realtime.optical?.txpower,
        temperature: realtime.optical?.temperature,
        offlineCount: realtime.onu.offline_event_count,
        firstUptime: realtime.onu.first_uptime,
        lastOfftime: realtime.onu.last_offtime,
      })
    } catch (error) {
      realtimeOnus.push({
        id: onu.id,
        olt: {
          id: onu.olt.id,
          name: onu.olt.name,
        },
        port: `${onu.eponPort}:${onu.onuId}`,
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      })
    } finally {
      await transport.disconnect()
    }
  }
  return {
    internetNo: endpoint.internetNo,
    name: endpoint.name,
    type: endpoint.type,
    address: endpoint.address,
    description: endpoint.description,
    package: endpoint.package,
    onuCount: realtimeOnus.length,
    onus: realtimeOnus,
  }

}

export async function getEndpointById(
  id: string
) {
  const endpoint = await prisma.endpoint.findUnique({
    where: {id},
    include: ENDPOINT_INCLUDE
  })

  return endpoint
}

export async function updateEndpoint(
  id: string,
  data: UpdateEndpointDto
) {
  let userPackage;
  if(data.packageId) {
    const result = await validatePackageExists(data.packageId)
    userPackage = result.id ? true : false
  }
  
  const endpoint = await prisma.endpoint.update({
    where: {
      id
    },
    data,
    include: {

      package: userPackage
    }
  })

  return endpoint
}

export async function deleteEndpoint(
  id: string
) {
  const del = await prisma.endpoint.delete({
    where: {
      id
    },
    include: {
      onus: {
        select: {
          id: true
        }
      },
      package: true
    }
  })
  return del
}