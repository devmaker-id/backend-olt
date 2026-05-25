import { prisma } from '../../config/prisma'
import { CreateOltDto } from './olt.types'

import { validateDuplicateOlt } from './olt.validation'

export async function createOlt(data: CreateOltDto) {
  await validateDuplicateOlt(data)
  return prisma.olt.create({data})
}

export async function getOlts() {
  return prisma.olt.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getOltById(id: string) {
  return prisma.olt.findUnique({
    where: {
      id
    }
  })
}

export async function updateOlt(
  id: string,
  data: any
) {
  return prisma.olt.update({
    where: {
      id
    },
    data
  })
}

export async function deleteOlt(id: string) {
  return prisma.olt.delete({
    where: {
      id
    }
  })
}