import {
  Onu,
  ConnectionState
} from '@prisma/client'
import { prisma } from '../../../config/prisma'
import { TelnetTransport } from '../../../services/network/transport/telnet.transport'
import { HisfocusAdapter } from '../../../services/network/vendors/hisfocus/hisfocus.adapter'
import { createOnuEvent } from './onu-event.service'
import { ReconcileResult } from './onu-reconcile.types'

export async function reconcileOnu(
  onuId: string
) {
  const onu = await prisma.onu.findUnique({
      where: { id: onuId },
      include: { olt: true }
    })
  if (!onu) {
    throw new Error( 'ONU_NOT_FOUND' )
  }
  const transport = new TelnetTransport()
  try {
    await transport.connect({
        host: onu.olt.ipAddress,
        port: onu.olt.telnetPort,
        username: onu.olt.username,
        password: onu.olt.password
      })
      const adapter = new HisfocusAdapter(
        transport
      )

      return reconcileOnuWithAdapter(
        onu,
        adapter
      )
  } finally {
    await transport.disconnect()
  }
}

export async function reconcileOlt(
  oltId: string
) {
  const onus = await prisma.onu.findMany({
      where: { oltId },
      select: { id: true }
    })
  const results = []
  for ( const onu of onus ) {
    try {
      const result =
        await reconcileOnu(
          onu.id
        )
      results.push(
        result
      )
    }
    catch(error) {
      console.log(error)
    }
  }
  return results
}


async function reconcileOnuWithAdapter(
  onu: Onu,
  adapter: HisfocusAdapter
): Promise<ReconcileResult> {

  const profile =
    await adapter.getCompleteOnuInfo(
      onu.eponPort,
      onu.onuId
    )

  const dbState = onu.connectionState

  const oltState = profile.onu.connectionState

  if(dbState === oltState) {
        return {
          success: true,
          changed: false,
          message: 'ONU_ALREADY_SYNC',
          oldState: dbState,
          newState: oltState
        }
      }

      const updateData: any = {
        connectionState: oltState
      }

      if(oltState === 'ONLINE') {
        updateData.temperature = profile.optical.temperature,
        updateData.voltage = profile.optical.voltage,
        updateData.txBias = profile.optical.txbias,
        updateData.txPower = profile.optical.txpower,
        updateData.rxPower = profile.optical.rxpower 
      } else {
        updateData.temperature = null,
        updateData.voltage = null,
        updateData.txBias = null,
        updateData.txPower = null,
        updateData.rxPower = null
      }

      await prisma.onu.update({
        where: {
          id: onu.id
        },
        data: updateData
      })

      await createOnuEvent({
        onuId: onu.id,
        event: 'RECONCILE_STATE_CHANGE',
        oldState: dbState ?? undefined,
        newState: oltState,
        source: 'RECONCILE',
        description: `DB=${dbState} OLT=${oltState}`
      })

      return {
        success: true,
        changed: true,
        message: 'ONU_RECONCILED',
        oldState: dbState,
        newState: oltState
      }
}