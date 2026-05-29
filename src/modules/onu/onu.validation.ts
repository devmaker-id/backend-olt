import { prisma } from '../../config/prisma'

export async function validateUnauthorizedOnu(
  macAddress: string
) {
  const registered = await prisma.onu.findUnique({
    where: { onuMac: macAddress }
  })

  if(registered) {
    return {
      success: false,
      message: 'ONU_ALREADY_REGISTERED_tested',
      data: registered
    }
  }

  const unauthorize = await prisma.unauthorizedOnu.findUnique({
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
  eponPort: string,
  onuId: string
) {

  const onu =
    await prisma.onu.findFirst({

      where: {
        oltId,
        eponPort,
        onuId
      }
    })

  if (onu) {

    return {
      success: false,
      message: 'ONU_ALREADY_REGISTERD'
    }
  }
}