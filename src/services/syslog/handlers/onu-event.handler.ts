import { prisma } from '../../../config/prisma'
import { env } from '../../../config/env'

import { normalizeMac }
from '../../../utils/normalize-onu'

import { EventCooldown }
from '../../cache/event.cooldown'

import { buildOnuAlertMessage }
from '../../telegram/messages/build-onu-alert'

import { createOnuEvent } from '../../../modules/onu/reconciliation/onu-event.service'

import { AlarmProcessor }
from '../processors/alarm.prosessor'

import { NotificationProcessor }
from '../processors/notification.processor'

import { UnauthorizedOnuProcessor } from '../processors/unauthorize-onu.prosessor'

import { SyslogEvent }
from '../core/syslog-event'

import { SyslogEventHandler }
from '../contracts/syslog-event-handler'

export class OnuEventHandler
implements SyslogEventHandler {

  async handle(
    event: SyslogEvent
  ): Promise<void> {
    const macAddress = event.onuMac ? normalizeMac(event.onuMac) : null
    const cooldownKey = `${event.onuMac}-${event.type}`
    const isOnline = event.type === 'ONU_LINKUP' || event.type === 'ONU_ONLINE'
    const newState = isOnline ? 'ONLINE' : 'OFFLINE'

    if (
      EventCooldown.isBlocked(
        cooldownKey
      )
    ) {
      console.log(
        'ALERT COOLDOWN'
      )
      return
    }

    const olt =
      await prisma.olt.findUnique({
        where: {
          syslogName: event.oltName
        }
      })

    if (!olt) {
      console.log(
        `UNKNOWN OLT ${event.oltName}`
      )
      return
    }

    if (
      env.syslogStrictMode
    ) {

      console.log(
        'SYSLOG_STRICT_MODE:',
        env.syslogStrictMode
      )

      if (
        olt.ipAddress !==
        event.sourceIp
      ) {

        console.log(
          `INVALID SYSLOG SOURCE ${event.sourceIp}`
        )

        return

      }

    }

    const onu = event.serialNumber
      ? await prisma.onu.findFirst({
        where: {
          serialNumber: event.serialNumber
        },
        include: {
          endpoint: true
        }
      })
      : macAddress
      ? await prisma.onu.findFirst({
        where: {
          onuMac: macAddress
        },

        include: {
          endpoint: true
        }

      })
      : null

    if (onu) {
      const oldState = onu.connectionState
      await prisma.onu.update({

        where: {
          id: onu.id
        },

        data: {
          connectionState: newState
        }

      })

      if (
        oldState !== newState
      ) {

        await createOnuEvent({
          onuId: onu.id,
          event: isOnline ? 'LINK_UP' : 'LINK_DOWN',
          oldState: oldState ?? undefined,
          newState,
          source: 'SYSLOG',
          description: event.rawLog
        })

      }

      await AlarmProcessor.create({
        oltId: onu.oltId,
        onuId: onu.id,
        type: isOnline ? 'ONU_LINKUP' : 'ONU_LINKDOWN',
        message: `ONU ${event.onuMac} ${event.type}`,
        sourceIp: event.sourceIp,
        rawLog: event.rawLog
      })

      const message = buildOnuAlertMessage(
          isOnline ? 'ONLINE' : 'OFFLINE',
          {
            name: onu.endpoint?.name,
            internetNo: onu.endpoint?.internetNo!,
            address: onu.endpoint?.address!,
            oltName: event.oltName,
            port: `${event.portId}:${event.onuId}`
          }
        )

      await NotificationProcessor.send(
        env.telegramChatId,
        message
      )

      return

    }

    // create, update unauthorize onu
    await UnauthorizedOnuProcessor.upsert({
      oltId: olt.id,
      onuName: event.onuName!,
      status: newState == "ONLINE" ? "LINKUP" : "LINKDOWN",
      serialNumber: event.serialNumber!,
      macAddress: event.onuMac!,
      portId: event.portId!,
      onuId: event.onuId!
    })

    let msg = ''
    msg += '🚨 <b>ONU UNREGISTERED</b>\n'
    msg += '======================\n'
    msg += `🛰 OLT: ${event.oltName}\n`
    msg += `🔌 PORT: ${event.portId}:${event.onuId}\n`
    macAddress
    ? msg += `📶 MAC: <code>${macAddress}</code>\n\n`
    : msg += `📶 SN: <code>${event.serialNumber}</code>\n\n`
    msg += '⚠️ ONU baru terdeteksi dan belum di-authorize.'

    await NotificationProcessor.send(
      env.telegramChatId,
      msg
    )

  }

}