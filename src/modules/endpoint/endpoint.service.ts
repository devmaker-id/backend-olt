import { prisma } from '../../config/prisma'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import { classifyRxPower } from '../../utils/classify-rx-power'

import {
  CreateEndpointDto,
  UpdateEndpointDto
} from './endpoint.types'

import { validateDuplicateEndpoint } from './endpoint.validation'

export async function createEndpoint(
  data: CreateEndpointDto
) {

  await validateDuplicateEndpoint(
    data
  )

  return prisma.endpoint.create({
    data
  })
}

export async function getEndpoints() {

  return prisma.endpoint.findMany({
    include: {
      onus: true
    },

    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getEndpointByInet(
  internetNo?: string
) {

  if (!internetNo) {

    return {
      success: false,
      message: 'Nomor internet wajib diisi'
    }
  }

  const endpoint =
    await prisma.endpoint.findUnique({

      where: {
        internetNo
      },

      include: {
        onus: {
          include: {
            olt: true
          }
        }
      }
    })

  if (!endpoint) {

    return {
      success: false,
      message:
        `Nomor internet ${internetNo} tidak terdaftar`
    }
  }

  const onu = endpoint.onus[0]

  if (!onu) {

    return {
      success: false,
      message: 'ONU tidak ditemukan'
    }
  }

  const transport = new TelnetTransport()

  await transport.connect({
    host: onu.olt.ipAddress,
    port: onu.olt.managementPort
  })

  const session = new TelnetSession( transport )
  await session.login({
    username: onu.olt.username,
    password: onu.olt.password
  })

  const adapter = new HisfocusAdapter( session )

  try {

    const realtime = await adapter.getCompleteOnuInfo(
        onu.eponPort,
        onu.onuId
      )

    const signalStatus = classifyRxPower( realtime.optical?.rxpower )

    return {
      success: true,
      data: {
        internetNo: endpoint.internetNo,
        name: endpoint.name,
        type: endpoint.type,
        address: endpoint.address,
        olt: {
          name: onu.olt.name
        },
        onu: {
          name: realtime.onu.onu_name,
          status: realtime.onu.connectionState,
          signalStatus,
          port: `${onu.eponPort}:${onu.onuId}`,
          model: realtime.onu.model_string,
          rxPower: realtime.optical?.rxpower,
          txPower: realtime.optical?.txpower,
          temperature: realtime.optical?.temperature,
          offlineCount: realtime.onu.offline_event_count,
          firstUptime: realtime.onu.first_uptime,
          lastOfftime: realtime.onu.last_offtime
        }
      }
    }
  }

  finally {

    await transport.disconnect()
  }
}

export async function getEndpointById(
  id: string
) {

  return prisma.endpoint.findUnique({
    where: {
      id
    },

    include: {
      onus: true
    }
  })
}

export async function updateEndpoint(
  id: string,
  data: UpdateEndpointDto
) {

  return prisma.endpoint.update({
    where: {
      id
    },

    data
  })
}

export async function deleteEndpoint(
  id: string
) {

  return prisma.endpoint.delete({
    where: {
      id
    }
  })
}