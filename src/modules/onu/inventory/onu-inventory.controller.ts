import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  getInventorySummary
} from './onu-inventory.service'

export async function getInventorySummaryController(
  _: FastifyRequest,
  reply: FastifyReply
) {

  const summary = await getInventorySummary()

  return reply.send({
    data: summary
  })
}