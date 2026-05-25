import { prisma }
  from '../../config/prisma'

import {
  CreateEndpointDto
} from './endpoint.types'

export async function validateDuplicateEndpoint(
  data: CreateEndpointDto
) {

  if (!data.code) {
    return
  }

  const endpoint =
    await prisma.endpoint.findUnique({
      where: {
        code: data.code
      }
    })

  if (endpoint) {

    throw new Error(
      'ENDPOINT_CODE_ALREADY_EXISTS'
    )
  }
}