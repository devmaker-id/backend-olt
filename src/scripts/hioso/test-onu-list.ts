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

    await session.login({
      username: 'admin',
      password: 'admin'
    })
    const pon = '0/3'
    
    await session.enable()
    console.log(`ONU_LIST_PON ${pon}`)
    const onus = await session.execute(`show onu info epon ${pon} all`)
    console.log(onus)

    await transport.disconnect()
}

main()