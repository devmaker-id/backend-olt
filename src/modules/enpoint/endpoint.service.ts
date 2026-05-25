import { prisma }
  from '../../config/prisma'

import {
  CreateEndpointDto,
  UpdateEndpointDto
} from './endpoint.types'

import {
  validateDuplicateEndpoint
} from './endpoint.validation'

export async function createEndpoint(
  data: CreateEndpointDto
) {

  await validateDuplicateEndpoint(
    data
  )

  return prisma.endpoint.create({
    data
  })
}

export async function getEndpoints() {

  return prisma.endpoint.findMany({
    include: {
      onus: true
    },

    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getEndpointById(
  id: string
) {

  return prisma.endpoint.findUnique({
    where: {
      id
    },

    include: {
      onus: true
    }
  })
}

export async function updateEndpoint(
  id: string,
  data: UpdateEndpointDto
) {

  return prisma.endpoint.update({
    where: {
      id
    },

    data
  })
}

export async function deleteEndpoint(
  id: string
) {

  return prisma.endpoint.delete({
    where: {
      id
    }
  })
}