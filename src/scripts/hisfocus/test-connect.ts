import {
  TelnetTransport
} from '../../services/network/hisfocus/telnet.transport'

async function main() {

  const transport =
    new TelnetTransport()

  await transport.connect({
    host: '192.168.110.3',
    port: 23
  })

  transport.onData(
    data => {
      console.log(
        'RAW',
        JSON.stringify(data)
      )
    }
  )
}

main()