import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'

async function main() {

  const transport = new TelnetTransport()

  try {

    await transport.connect({
      host: '192.168.110.3',
      port: 23
    })

    const session = new TelnetSession(transport)

    await session.login({
      username: 'admin',
      password: 'admin'
    })

    const adapter = new HisfocusAdapter(session)
    const profile = await adapter.getCompleteOnuInfo( '0/1', '1' )

    console.dir(
      profile,
      {
        depth: null
      }
    )
  } finally {
    await transport.disconnect()
  }
}

main()