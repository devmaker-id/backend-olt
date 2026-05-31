import { prisma } from '../../../config/prisma'
import { TelnetTransport } from '../../../services/network/hisfocus/telnet.transport'
import { HisfocusAdapter } from '../../../services/network/hisfocus/hisfocus.adapter'
import { TelnetSession } from '../../../services/network/hisfocus/telnet.session'

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
