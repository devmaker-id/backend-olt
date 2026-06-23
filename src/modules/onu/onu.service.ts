import { prisma } from '../../config/prisma'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'

import {
  validateExistingOnu,
  validDeleteOnu
} from '../onu/validation/onu.validation'

import { normalizeOnuName } from '../../utils/normalize-onu'

import { createOnuDto } from './schemas/create-onu.schema'
import { NotFoundError } from '../../core/errors/not-found.error'
import { getEndpointById } from '../endpoint/endpoint.service'

export async function getAllOnu() {
  return prisma.onu.findMany()
}

export async function authorizeOnu(
  data: createOnuDto
){

  const olt = await prisma.olt.findUnique({
    where: {
      id: data.oltId
    }
  })

  if(!olt){
    throw new NotFoundError(
      'OLT_NOT_FOUND'
    )
  }
  const endpoint = await getEndpointById(data.endpointId)
  if(!endpoint){
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND'
    )
  }

  await validateExistingOnu(
    olt.id,
    data.portId,
    data.onuId
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
        data.onuName
      )
    await adapter.renameOnu(
      data.portId,
      data.onuId,
      normalizedName
    )
    await adapter.saveConfig()

    const profile = await adapter.getCompleteOnuInfo(
        data.portId,
        data.onuId
      )
    
    const result = await prisma.$transaction(
        async tx => {
          const onu =
            await tx.onu.create({
              data: {
                oltId: olt.id,
                endpointId: endpoint.id,
                onuMac: data.onuMac,
                portId: data.portId,
                onuId: data.onuId,
                onuName: endpoint.name,
                onuComtName: data.onuName,
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
                id: data.unauthorizeId
              }
            })

          return {
              internetNo: endpoint.internetNo,
              name: endpoint.name,
              type: endpoint.type,
              serialNumber: onu.serialNumber,
              macAddress: onu.onuMac,
              port: `${onu.portId}:${onu.onuId}`
            }
        }
      )

    return result
  }

  finally {

    await transport.disconnect()
  }
}

export async function deleteOnu(
  id: string,
) {
  const onu = await validDeleteOnu(id)
  return prisma.onu.delete({
    where: {
      id: onu.id,
    },
  })
}