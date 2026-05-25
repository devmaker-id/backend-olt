import { FastifyReply, FastifyRequest } from "fastify"
import { authorizeOnu, getUnauthorizedOnus } from "./onu.service"
import { AuthorizeOnuDto } from "./onu.types"

export async function authorizeOnuController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  try {

    const body =
      req.body as AuthorizeOnuDto

    const onu =
      await authorizeOnu(body)

    return reply.send({
      success: true,
      data: onu
    })

  }

  catch (error: any) {

    return reply.code(400).send({
      success: false,
      message: error.message
    })
  }
}

export async function getUnauthorizedOnusController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  try {

    const data =
      await getUnauthorizedOnus()

    return reply.send({
      success: true,
      total: data.length,
      data
    })

  }

  catch (error: any) {

    return reply.code(500).send({
      success: false,
      message: error.message
    })
  }
}