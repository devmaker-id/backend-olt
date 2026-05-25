import { prisma } from '../../../../config/prisma'
import { ParsedSyslog } from '../../core/syslog.types'
import { env } from '../../../../config/env'
import { TelegramService } from '../../../telegram/telegram.service'
import { EventCooldown } from '../../../cache/event.cooldown'
import { normalizeMac } from '../../../../utils/normalize-onu'
import { buildOnuAlertMessage } from '../../../telegram/messages/build-onu-alert'

export class HisfocusSyslogService {
  static async process(
    parsed: ParsedSyslog
  ) {
    const normalizedMac = normalizeMac( parsed.onuMac )
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
          onuMac: normalizedMac
        },
        include: {
          endpoint: true
        }
      })
    console.log('ONU_MAC', parsed.onuMac)

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
      const message =
        buildOnuAlertMessage(
          parsed.status === 'linkup' ? 'ONLINE' : 'OFFLINE',
          {
            name: onu.endpoint?.name,
            internetNo: onu.endpoint?.internetNo!,
            address: onu.endpoint?.address!,
            oltName: parsed.oltName,
            port: `${parsed.eponPort}:${parsed.onuId}`
          }
        )

      await TelegramService.sendMessage({
        chatId: env.telegramChatId,
        text: message
      })
      return
    }

    await prisma.unauthorizedOnu.upsert({

      where: {
        macAddress: normalizeMac( parsed.onuMac )
      },

      update: {
        eponPort: parsed.eponPort,
        onuId: parsed.onuId,
        discoveredAt: new Date()
      },

      create: {
        oltId: olt.id,
        macAddress: normalizeMac( parsed.onuMac ),
        eponPort: parsed.eponPort,
        onuId: parsed.onuId
      }
    })

    await TelegramService.sendMessage({
      chatId: env.telegramChatId,
      text:
`
🚨 <b>ONU UNREGISTERED</b>
======================
🛰 OLT: ${parsed.oltName}
🔌 PORT: ${parsed.eponPort}:${parsed.onuId}
📶 MAC: <code>${normalizeMac( parsed.onuMac )}</code>

⚠️ ONU baru terdeteksi dan belum di-authorize.
`
    })
  }
}