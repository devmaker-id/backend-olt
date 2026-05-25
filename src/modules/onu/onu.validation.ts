import { prisma }
  from '../../config/prisma'

export async function validateUnauthorizedOnu(
  macAddress: string
) {

  const onu =
    await prisma.unauthorizedOnu
      .findUnique({
        where: {
          macAddress
        }
      })

  if (!onu) {

    throw new Error(
      'UNAUTHORIZED_ONU_NOT_FOUND'
    )
  }

  return onu
}

export async function validateEndpoint(
  endpointId: string
) {

  const endpoint =
    await prisma.endpoint.findUnique({
      where: {
        id: endpointId
      }
    })

  if (!endpoint) {

    throw new Error(
      'ENDPOINT_NOT_FOUND'
    )
  }

  return endpoint
}