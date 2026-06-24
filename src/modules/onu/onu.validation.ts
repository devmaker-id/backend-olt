import { prisma } from '../../config/prisma'

export async function validateUnauthorizedOnu(
  macAddress: string
) {
  const registered = await prisma.onu.findFirst({
    where: { onuMac: macAddress },
    include: {
      endpoint: {
        select: {
          internetNo: true
        }
      }
    }
  })

  if(registered) {
    return {
      success: false,
      message: 'ONU_ALREADY_REGISTERED',
      data: registered
    }
  }

  const unauthorize = await prisma.unauthorizedOnu.findFirst({
      where: { macAddress }
    })

  if (!unauthorize) {
    return {
      success: false,
      message: 'UNAUTHORIZED_ONU_NOT_FOUND',
      data: null
    }
  }

  return {
    success: true,
    message: 'ONU_AVAILABLE_REGISTERD',
    data: unauthorize
  }
}

export async function validateExistingOnu(
  oltId: string,
  portId: string,
  onuId: string
) {

  return prisma.onu.findFirst({
    where: {
      oltId,
      portId,
      onuId
    }
  })
}