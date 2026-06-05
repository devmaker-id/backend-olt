import { prisma } from '../../../config/prisma'

import {
  OnuInventorySummary
} from './onu-inventory.types'

export async function getInventorySummary():
Promise<OnuInventorySummary> {
    const [
        registered,
        unregistered,
        online,
        offline,
        powerOff,
        fiberLos,
        authFailed,
        unknown
    ] = await Promise.all([
        prisma.onu.count(),
        prisma.unauthorizedOnu.count(),
        prisma.onu.count({
            where: {
                connectionState: 'ONLINE'
            }
        }),
        prisma.onu.count({
            where: {
                connectionState: 'OFFLINE'
            }
        }),
        prisma.onu.count({
            where: {
                connectionState: 'ONU_POWER_OFF'
            }
        }),
        prisma.onu.count({
            where: {
                connectionState: 'FIBER_LOS'
            }
        }),
        prisma.onu.count({
            where: {
                connectionState: 'ONU_AUTH_FAILED'
            }
        }),
        prisma.onu.count({
            where: {
                connectionState: 'UNKNOWN'
            }
        })
    ])

  return {
    total: registered + unregistered,
    registered,
    unregistered,
    online,
    offline,
    powerOff,
    fiberLos,
    authFailed,
    unknown
  }
}