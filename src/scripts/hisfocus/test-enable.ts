import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'

async function main() {

  const transport =
    new TelnetTransport()

  await transport.connect({
    host: '192.168.110.3',
    port: 23
  })

    const session = new TelnetSession( transport )
    const open = await session.login({
      username: 'admin',
      password: 'admin'
    })
    
    console.log(open)
    const enable = await session.execute('enable')
    console.log(enable)
    const exit = await session.execute('exit')
    console.log(exit)

    await transport.disconnect()
}

main()