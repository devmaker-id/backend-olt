import {prisma} from "../../config/prisma"
import {
    validationReadySylogEvent
} from './validation/syslog-event.validation'

export async function syslogEventAllData(){
    const syslogEvents = await prisma.syslogEventLog.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return syslogEvents
}
export async function syslogEventById(
    id: string
) {
    const syslogEvent = await validationReadySylogEvent(id)
    return syslogEvent
}
export async function deleteSylogEvent(
    id: string
) {
    await validationReadySylogEvent(id)
    const syslogDeleted = await prisma.syslogEventLog.delete({
        where: {
            id
        }
    })
    return syslogDeleted
}
