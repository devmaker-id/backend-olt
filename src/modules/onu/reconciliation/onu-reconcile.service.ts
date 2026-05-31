import { prisma } from '../../../config/prisma'
import { TelnetTransport } from '../../../services/network/hisfocus/telnet.transport'
import { HisfocusAdapter } from '../../../services/network/hisfocus/hisfocus.adapter'
import { TelnetSession } from '../../../services/network/hisfocus/telnet.session'
import { ReconcileResult } from './onu-reconcile.types'
import { createOnuEvent } from './onu-event.service'
import { Onu } from '@prisma/client'

export async function reconcileOltWithSession(oltId:string){
  const onus = await prisma.onu.findMany({
    where:{oltId},
    include:{olt:true}
  })
  if(onus.length === 0) { return [] }
  const olt = onus[0].olt
  const transport = new TelnetTransport()
  try {
    await transport.connect({
      host: olt.ipAddress,
      port: olt.telnetPort
    })
    const session = new TelnetSession(transport)
    await session.login({
      username: olt.username,
      password: olt.password
    })
    const adapter = new HisfocusAdapter(session)

    let changed = 0
    let unchanged = 0
    let failed = 0
    const results: ReconcileResult[] = []

    for(const onu of onus) {
      try {
        const reconcileResult = await reconcileOnuWithAdapter(
          onu,
          adapter
        )
        results.push(
          reconcileResult
        )
        if(reconcileResult.changed){
          changed++
        } else {
          unchanged++
        }
      } catch(error) {
        failed++
        console.log(
          'RECONCILE_ERROR',
          onu.onuName ?? onu.onuMac
        )
        console.log(error)
      }
    }
    return {
      total: onus.length,
      changed,
      unchanged,
      failed,
      results
    }
  } finally {
    await transport.disconnect()
  }
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

  const dbState =
    onu.connectionState

  const oltState =
    profile.onu.connectionState

  if (dbState === oltState) {

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

  if (oltState === 'ONLINE') {

    updateData.temperature =
      profile.optical.temperature

    updateData.voltage =
      profile.optical.voltage

    updateData.txBias =
      profile.optical.txbias

    updateData.txPower =
      profile.optical.txpower

    updateData.rxPower =
      profile.optical.rxpower

  } else {

    updateData.temperature = null
    updateData.voltage = null
    updateData.txBias = null
    updateData.txPower = null
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
    description:
      `DB=${dbState} OLT=${oltState}`
  })

  return {
    success: true,
    changed: true,
    message: 'ONU_RECONCILED',
    oldState: dbState,
    newState: oltState
  }
}

export async function reconcileOnu(onuId: string) {
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
        port: onu.olt.telnetPort
      })

      const session = new TelnetSession(transport)

      await session.login({
        username: onu.olt.username,
        password: onu.olt.password
      })

      const adapter = new HisfocusAdapter(session)
      const result =  await adapter.getCompleteOnuInfo(
        onu.eponPort,
        onu.onuId
      )
      return result

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
        result.onu.onu_name
      )
    }
    catch(error) {
      console.log(error)
    }
  }
  return results
}
