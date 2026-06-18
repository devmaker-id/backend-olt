import {
    FastifyRequest,
    FastifyReply
 } from "fastify";
import {
    createOnuUnauthorize,
    deleteUnauthorizeOnu,
    getUnAuthorizes,
    getUnauthorizeOnuById,
    getUnauthorizeOnuByMacAddress,
    getUnauthorizeOnuBySerialNumber,
} from "./onu-unauthorize.service";
import { list, ok } from "../../core/http/response";
import { NotFoundError } from "../../core/errors/not-found.error";
import { createOnuUnauthorizeSchema } from "./schemas/create-onu-unauthorize.schema";
import {
    unauthorizeOnuIdParam,
    unauthorizeOnuMacAddressParam,
    unauthorizeOnuSerialNumberParam
} from "./schemas/unauthorize-onu.params";

export async function createUnauthorizeOnuController(
   req: FastifyRequest,
   reply: FastifyReply
) {
   const body = createOnuUnauthorizeSchema.parse(
       req.body
   )
   const response = await createOnuUnauthorize(
       body
   )
   return reply.send(
       ok(
           response,
           'CREATE_UNAOUTHORIZE_NOT_MODULE'
       )
   )
}
export async function getOnusUnauthorizeController(
   _: FastifyRequest,
   reply: FastifyReply
) {
   const unauthorizeOnu = await getUnAuthorizes()
   if(!unauthorizeOnu){
       throw new NotFoundError(
           'ONU_UNAUTHORIZE_NOT_FOUND'
       )
   }
   return reply.send(
       list(
           unauthorizeOnu,
           unauthorizeOnu.length,
          'ONU_UNAUTHORIZE_FOUND'
       )
   )
}

export async function getUnauthorizeOnuIdController(
   req: FastifyRequest,
   reply: FastifyReply
) {
   const params = unauthorizeOnuIdParam.parse(
       req.params
   )
   const response = await getUnauthorizeOnuById(params.id)
   if(!response){
       throw new NotFoundError(
           'ONU_UNAUTHORIZE_ID_NOT_FOUND'
       )
   }
   return reply.send(
       ok(
           response,
           'ONU_UNAUTHORIZE_FOUND'
       )
   )
}
export async function getUnauthorizeOnuMacController(
   req: FastifyRequest,
   reply: FastifyReply
) {
   const params = unauthorizeOnuMacAddressParam.parse(
       req.params
   )
   const response = await getUnauthorizeOnuByMacAddress(params.macAddress)
   if(!response){
       throw new NotFoundError(
           'ONU_UNAUTHORIZE_NOT_MAC_FOUND'
       )
   }
   return reply.send(
       ok(
           response,
           'ONU_UNAUTHORIZE_FOUND'
       )
   )
}

export async function getUnauthorizeOnuSnController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const params = unauthorizeOnuSerialNumberParam.parse(
        req.params
    )
    const response = await getUnauthorizeOnuBySerialNumber(params.serialNumber)
    if(!response){
       throw new NotFoundError(
           'ONU_UNAUTHORIZE_SN_NOT_FOUND'
       )
   }
   return reply.send(
       ok(
           response,
           'ONU_UNAUTHORIZE_FOUND'
       )
   )
}
export async function deleteUnauthorizeOnuController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const params = unauthorizeOnuIdParam.parse(
        req.params
    )
    const onu = await getUnauthorizeOnuById(params.id)
    if(!onu){
        throw new NotFoundError(
            'AUTHORIZE_ONU_NOT_FOUND'
        )
    }
    const response = await deleteUnauthorizeOnu(params.id)
    return reply.send(
        ok(
            response,
            'UNAUTHORIZE_ONU_DELETED'
        )
    )
}