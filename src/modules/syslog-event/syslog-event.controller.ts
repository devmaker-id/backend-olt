import {
    FastifyRequest,
    FastifyReply
} from "fastify";
import {
    syslogEventAllData,
    syslogEventById,
    deleteSylogEvent
} from './syslog-event.service'
import { syslogEventParamsId } from './schemas/syslog-event.params'
import { ok, list, noContent } from "../../core/http/response";

export async function syslogEventDataController(
    _: FastifyRequest,
    reply: FastifyReply
) {
    const syslogEvent = await syslogEventAllData()
    if(syslogEvent.length === 0){
        return noContent('SYSLOG_EVENT_NO_DATA')
    }
    return reply.send(
        list(
            syslogEvent,
            syslogEvent.length,
            'SYSLOG_EVENT_FOUND'
        )
    )
}
export async function getSyslogEventController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const params = syslogEventParamsId.parse(
        req.params
    )
    const syslogEvent = await syslogEventById(params.id)
    return reply.send(
        ok(
            syslogEvent,
            'SYSLOG_FOUND'
        )
    )
}
export async function deleteSylogEventController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const params = syslogEventParamsId.parse(
        req.params
    )
    const syslogDeleted = await deleteSylogEvent(params.id)
    return reply.send(
        ok(
            syslogDeleted,
            'SYSLOG_EVENT_DELETED'
        )
    )
}