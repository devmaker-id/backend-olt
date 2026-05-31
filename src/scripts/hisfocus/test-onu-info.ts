import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusParser } from '../../services/network/hisfocus/hisfocus.parser'

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
    
    await session.enable()
    console.log('ONU_RESULT')
    const onu = await session.execute('show onu info epon 0/1 1')
    const parseOnu =  HisfocusParser.parseOnuInfo(onu)
    console.log('PARSED: ', parseOnu)

    console.log('RESULT_OPTIK')
    const optical = await session.execute('show onu optical-ddm epon 0/1 1')
    const parseOptical = HisfocusParser.parseOpticalInfo(optical)
    console.log('PARSED_OPTICAL: ', parseOptical)

    await transport.disconnect()
}

main()