import { prisma } from '../../../config/prisma'

export async function reconcileOnu(
  onuId: string
) {
  const onu = await prisma.onu.findUnique({
      where: {
        id: onuId
      },
      include: {
        olt: true
      }
    })
  if (!onu) {
    throw new Error(
      'ONU_NOT_FOUND'
    )
  }

  return onu
}