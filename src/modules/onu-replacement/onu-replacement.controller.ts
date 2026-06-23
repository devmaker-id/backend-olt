import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  getOnuReplacements,
  getOnuReplacementById,
  replaceOnu
} from './onu-replacement.service'
import { replacementSchema } from './shcemas/replacement.schema'
import { ok, list } from '../../core/http/response'
import { paramsReplacementIdSchema } from './shcemas/params-replacement.schema'

export async function getOnuReplacementsController(
  _: FastifyRequest,
  reply: FastifyReply
){
  const replacements = await getOnuReplacements()

  return reply.send(
    list(
      replacements,
      replacements.length,
      'LIST_REPLACEMENTS'
    )
  )
}

export async function getOnuReplacementByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsReplacementIdSchema.parse(
    req.params
  )
  const data = await getOnuReplacementById(params.id)
  return reply.send(
    ok(
      data,
      'REPLACEMENT_FOUND'
    )
  )
}

export async function replaceOnuController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = replacementSchema.parse(req.body)
  const result = await replaceOnu(body)
  return reply.send(
    ok(
      result,
      'RESPLACEMENT_ONU_SUCCESS'
    )
  )
}