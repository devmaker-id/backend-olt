import {
  FastifyRequest
}
from 'fastify'

import {
  replaceOnu
} from './onu-replacement.service'

import {
  ReplaceOnuDto
} from './onu-replacement.types'

export async function
replaceOnuController(

  request: FastifyRequest<{
    Body: ReplaceOnuDto
  }>
) {

  const result =
    await replaceOnu(
      request.body
    )

  return {
    data: result
  }
}