import { prisma } from "../../../config/prisma"

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