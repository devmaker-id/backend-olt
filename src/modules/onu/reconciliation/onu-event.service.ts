import { prisma } from '../../../config/prisma'
import { CreateOnuEventDto } from './onu-reconcile.types'

export async function createOnuEvent(
  data: CreateOnuEventDto
) {
  return prisma.onuEvent.create({
    data: {
      onuId: data.onuId,
      event: data.event,
      oldState: data.oldState,
      newState: data.newState,
      source: data.source,
      description: data.description
    }
  })
}