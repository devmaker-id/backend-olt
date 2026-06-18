import {
    FastifyRequest,
    FastifyReply
 } from "fastify";
import {
    createOnuUnauthorize,
    getUnAuthorizes,
    getUnauthorizeOnuById,
} from "./onu-unauthorize.service";
import { list, ok } from "../../core/http/response";
import { NotFoundError } from "../../core/errors/not-found.error";
import { createOnuUnauthorizeSchema } from "./schemas/create-onu-unauthorize.schema";
import { unauthorizeOnuIdParam } from "./schemas/unauthorize-onu-id.params";

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
            'ONU_UNAUTHORIZE_NOT_FOUND'
        )
    }
    return reply.send(
        ok(
            response,
            'ONU_UNAUTHORIZE_FOUND'
        )
    )
 }