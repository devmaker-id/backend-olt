import { prisma } from '../../config/prisma'
import { CreateEndpointDto } from './endpoint.types'

export async function validateInternetNo(
  internetNo?: string
) {

  if (!internetNo) {
    return
  }

  const endpoint =
    await prisma.endpoint.findUnique({
      where: {
        internetNo
      }
    })

  if (endpoint) {

    throw new Error(
      'INTERNET_NUMBER_ALREADY_EXISTS'
    )
  }
}

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