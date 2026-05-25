import { prisma } from '../../../../config/prisma'
import { ParsedSyslog } from '../../core/syslog.types'
import { env } from '../../../../config/env'
import { TelegramService } from '../../../telegram/telegram.service'
import { EventCooldown } from '../../../cache/event.cooldown'

export class HisfocusSyslogService {
  static async process(
    parsed: ParsedSyslog
  ) {
    const cooldownKey = `${parsed.onuMac}-${parsed.status}`
    if ( EventCooldown.isBlocked(cooldownKey)) {
      console.log('ALERT COOLDOWN')
      return
    }

    const olt = await prisma.olt.findUnique({
      where: {
        syslogName: parsed.oltName
      }
    })
    if (!olt) {
      console.log(`UNKNOWN OLT ${parsed.oltName}`)
      return
    }
    if(env.syslogStrictMode) {
      if (olt.ipAddress !== parsed.sourceIp) {
        console.log(`INVALID SYSLOG SOURCE ${parsed.sourceIp}`)
        return
      }
    }
    
    const onu = await prisma.onu.findUnique({
        where: {
          onuMac: parsed.onuMac
        },
        include: {
          endpoint: true
        }
      })

    if (onu) {

      await prisma.onu.update({
        where: {
          id: onu.id
        },

        data: {
          connectionState: parsed.status === 'linkup' ? 'ONLINE' : 'OFFLINE'
        }
      })

      await prisma.alarmLog.create({
        data: {
          oltId: onu.oltId,
          onuIdRef: onu.id,
          type: parsed.status === 'linkup' ? 'ONU_LINKUP' : 'ONU_LINKDOWN',
          message: `ONU ${parsed.onuMac} ${parsed.status}`,
          sourceIp: parsed.sourceIp,
          rawLog: parsed.raw
        }
      })

      console.log(
        `ONU REGISTERED ${parsed.onuMac}`
      )
      await TelegramService.sendMessage(
      `
${parsed.status === 'linkup' ? '🟢 ONU ONLINE' : '🔴 ONU OFFLINE'}

SITE    : ${onu.endpoint?.name ?? '-'}
OLT     : ${parsed.oltName}
PORT    : ${parsed.eponPort}:${parsed.onuId}
ONU     : ${onu.onuName}
TYPE    : ${onu.endpoint?.type}
LOK     : ${onu.endpoint?.address}`)

      return
    }

    await prisma.unauthorizedOnu.upsert({

      where: {
        macAddress: parsed.onuMac
      },

      update: {
        eponPort: parsed.eponPort,
        onuId: parsed.onuId,
        discoveredAt: new Date()
      },

      create: {
        oltId: olt.id,
        macAddress: parsed.onuMac,
        eponPort: parsed.eponPort,
        onuId: parsed.onuId
      }
    })

    await TelegramService.sendMessage(
      `🚨 ONU UNREGISTERED

      OLT    : ${parsed.oltName}
      MAC    : ${parsed.onuMac}
      PORT   : ${parsed.eponPort}:${parsed.onuId}

      ONU baru terdeteksi dan belum di-authorize.`
    )

    console.log(
      `ONU UNREGISTERED ${parsed.onuMac}`
    )
  }
}