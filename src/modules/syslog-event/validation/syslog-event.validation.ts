import {prisma} from '../../../config/prisma'
import { NotFoundError } from '../../../core/errors/not-found.error'

export async function validationExistsData(){
    const syslogEvents = await prisma.syslogEventLog.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    if(syslogEvents.length === 0){
        throw new NotFoundError(
            'SYSLOG_EVENT_NOT_FOUND'
        )
    }
    return syslogEvents
}

export async function validationReadySylogEvent(
    id: string
) {
    const syslogEvent = await prisma.syslogEventLog.findUnique({
        where: {
            id
        }
    })
    if(!syslogEvent) {
        throw new NotFoundError(
            'SYSLOG_EVENT_NOT_FOUND'
        )
    }
    return syslogEvent
}