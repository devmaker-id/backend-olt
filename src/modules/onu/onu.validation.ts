import { prisma }
  from '../../config/prisma'

export async function validateUnauthorizedOnu(
  macAddress: string
) {

  const onu =
    await prisma.unauthorizedOnu.findUnique({
      where: { macAddress }
    })

  if (!onu) {
    throw new Error( 'UNAUTHORIZED_ONU_NOT_FOUND' )
  }

  return onu
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

    throw new Error(
      'ONU_ALREADY_REGISTERED'
    )
  }
}