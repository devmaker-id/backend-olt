import { FastifyRequest } from 'fastify'
import {
  getOnuReplacements,
  getOnuReplacementById,
  replaceOnu
} from './onu-replacement.service'
import { ReplaceOnuDto } from './onu-replacement.types'

export async function getOnuReplacementsController(){
  const replacements = await getOnuReplacements()
  return {
    data: replacements
  }
}

export async function getOnuReplacementByIdController(
  request: FastifyRequest<{
    Params: {
      id: string
    }
  }>
) {
  const data = await getOnuReplacementById(request.params.id)
  return {data}
}

export async function replaceOnuController(

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