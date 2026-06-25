import {prisma} from "../../config/prisma"
import {
    validationExistsData,
    validationReadySylogEvent
} from './validation/syslog-event.validation'

export async function syslogEventAllData(){
    const syslogEvents = await validationExistsData()
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
