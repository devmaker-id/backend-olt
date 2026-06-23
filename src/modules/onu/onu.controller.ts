import { FastifyReply, FastifyRequest } from "fastify"

import {
  getAllOnu,
  authorizeOnu,
  deleteOnu,
} from "./onu.service"
import { OnuStatus } from "@prisma/client"

import {
  paramsCreateOnuSchema,
} from "./schemas/create-onu.schema"

import { ok, list } from "../../core/http/response"
import { NotFoundError } from "../../core/errors/not-found.error"
import { getUnauthorizeOnuById } from "../onu-unauthorize/onu-unauthorize.service"
import { ValidationError } from "../../core/errors/validation.error"
import { paramsOnuIdSchema } from "./schemas/params-onu.schema"

export async function getOnusController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const onus = await getAllOnu()
  if(!onus){
    throw new NotFoundError(
      'ONUS_NOT_FOUND'
    )
  }
  return reply.send(
    list(
      onus,
      onus.length,
      'ONUS_FOUND'
    )
  )
}

export async function authorizeOnuController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = paramsCreateOnuSchema.parse(
    req.body
  )
  const unauthorizeOnu = await getUnauthorizeOnuById(body.unauthorizeId)
  if(!unauthorizeOnu){
    throw new NotFoundError(
      'UNAUTHORIZ_ONU_ONT_FOUND'
    )
    }
  if (!unauthorizeOnu.portId) {
    throw new ValidationError(
      'ONU_PORT_NOT_FOUND'
    )
  }
  if(!unauthorizeOnu.onuName){
    throw new ValidationError(
      'ONU_NAME_NOT_FOUND'
    )
  }

  if (!unauthorizeOnu.onuId) {
    throw new ValidationError(
      'ONU_ID_NOT_FOUND'
    )
  }

  const params = {
    oltId: unauthorizeOnu.oltId,
    endpointId: body.endpointId,
    unauthorizeId: unauthorizeOnu.id,
    portId: unauthorizeOnu.portId,
    onuId: unauthorizeOnu.onuId,
    serialNumber: unauthorizeOnu.serialNumber ?? undefined,
    onuMac: unauthorizeOnu.macAddress ?? undefined,
    onuName: unauthorizeOnu.onuName,
    status: OnuStatus.ACTIVE,
    isActive: true
  }

  const result = await authorizeOnu(params)
  
  return reply.send(
    ok(
      result,
      'ONU_CREATED_SUCCESS'
    )
  )
}

export async function deleteOnuController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOnuIdSchema.parse(
    req.params
  )
  const onu = await deleteOnu(params.id)
  return reply.send(
    ok(
      onu,
      'ONU_DELETED'
    )
  )
}
