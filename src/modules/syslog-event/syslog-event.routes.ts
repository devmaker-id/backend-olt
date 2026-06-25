import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { Role } from "@prisma/client";
import {
    syslogEventDataController,
    getSyslogEventController,
    deleteSylogEventController
} from "./syslog-event.controller";

export async function syslogEventRoutes(
    app: FastifyInstance
) {
    app.addHook('preHandler', authMiddleware)
    //semua route syslogEvent khusus owner
    app.addHook('preHandler', roleMiddleware(
        Role.OWNER
    ))

    app.get('/', syslogEventDataController)
    app.get('/:id', getSyslogEventController)
    app.delete('/:id', deleteSylogEventController)
}