import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'

async function main() {
  const transport = new TelnetTransport()
  await transport.connect({
    host: '192.168.1.3',
    port: 23
  })

  const session = new TelnetSession(
      transport
    )

  await session.login({
    username: 'admin',
    password: 'admin'
  })

  const adapter = new HisfocusAdapter(
      session
    )

  await adapter.deleteOnu(
    '0/3',
    '67'
  )
  await adapter.saveConfig()

  console.log(
    'ONU deleted'
  )

  await transport.disconnect()
}

main()