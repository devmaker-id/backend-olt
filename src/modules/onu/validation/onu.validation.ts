import { prisma } from "../../../config/prisma"
import { ForbiddenError } from "../../../core/errors/forbidden.error"

import { NotFoundError } from "../../../core/errors/not-found.error"

export async function validateExistingOnu(
  oltId: string,
  portId: string,
  onuId: string
) {

  const response = await prisma.onu.findFirst({
    where: {
      oltId,
      portId,
      onuId
    }
  })
  if(response){
    throw new NotFoundError(
        'ONU_ALREADY_REGISTERED'
    )
  }
}
export async function validDeleteOnu(
  id: string,
) {
  const onu = await prisma.onu.findUnique({
      where: {
        id,
      },
    })
  if (!onu) {
    throw new NotFoundError(
      'ONU_NOT_FOUND',
    )
  }
  const replacement = await prisma.onuReplacement.findFirst({
    where: {
      oldOnuId: onu.id
    }
  })
  if (replacement) {
    throw new ForbiddenError(
      'REPLACEMENT_USED_ONU_CANNOT_DELETE',
    )
  }
  if (onu.isActive) {
    throw new ForbiddenError(
      'ACTIVE_ONU_CANNOT_DELETE',
    )
  }
  return onu
}