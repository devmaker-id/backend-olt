import { TelnetTransport }
  from '../../transport/telnet.transport'

import { HisfocusCommands }
  from './hisfocus.commands'

import { HisfocusParser }
  from './hisfocus.parser'

export class HisfocusAdapter {

  private enabled = false

  constructor(
    private transport:
      TelnetTransport
  ) {}

  async enableMode():
    Promise<string> {

    if (this.enabled) {
      return 'ALREADY_ENABLED'
    }

    const result =
      await this.transport.sendCommand(
        HisfocusCommands.enable
      )

    this.enabled = true

    return result
  }

  private async executeWithEnable(
    command: string
  ): Promise<string> {

    await this.enableMode()

    return this.transport.sendCommand(
      command
    )
  }

  async getSystemInfo() {

    const raw =
      await this.executeWithEnable(
        HisfocusCommands.showSystem
      )

    return HisfocusParser
      .parseSystemInfo(raw)
  }

  async getNetworkInfo() {

    const raw =
      await this.executeWithEnable(
        HisfocusCommands.showNetwork
      )

    return HisfocusParser
      .parseNetworkInfo(raw)
  }

  async getOnuInfo(
    epon: string,
    onuId: string
  ) {

    const raw =
      await this.executeWithEnable(
        HisfocusCommands
          .showOnuInfo(
            epon,
            onuId
          )
      )

    if (
      !raw.includes('Onu Id')
    ) {

      throw new Error(
        'ONU_NOT_FOUND'
      )
    }

    return HisfocusParser
      .parseOnuInfo(raw)
  }

  async getOpticalInfo(
    epon: string,
    onuId: string
  ) {

    const raw =
      await this.executeWithEnable(
        HisfocusCommands
          .showOpticalInfo(
            epon,
            onuId
          )
      )

    return HisfocusParser
      .parseOpticalInfo(raw)
  }

  async getCompleteOnuInfo(
    epon: string,
    onuId: string
  ) {

    const onu =
      await this.getOnuInfo(
        epon,
        onuId
      )

    let optical = null

    if (
      onu.connectionState ===
      'ONLINE'
    ) {
      try {
        optical = await this.getOpticalInfo(
          epon,
          onuId
        )
      } catch (error) {
        optical = {
          temperature: null,
          voltage: null,
          txbias: null,
          txpower: null,
          rxpower: null
        }
      }
    }

    return {
      onu,
      optical
    }
  }

  private sleep(ms: number) {

    return new Promise(
      resolve =>
        setTimeout(resolve, ms)
    )
  }

  async renameOnu(
    epon: string,
    onuId: string,
    name: string
  ) {

    await this.transport.sendCommand(
      'enable'
    )

    await this.sleep(300)

    await this.transport.sendCommand(
      'configure terminal'
    )

    await this.sleep(300)

    await this.transport.sendCommand(
      `interface epon ${epon}`
    )

    await this.sleep(500)

    await this.transport.sendCommand(

      HisfocusCommands.renameOnu(
        epon,
        onuId,
        name
      )
    )

    await this.sleep(500)

    await this.transport.sendCommand(
      'exit'
    )

    await this.sleep(500)

    await this.transport.sendCommand(
      'exit'
    )

    await this.sleep(1000)

    console.log(
      'WRITE FILE START'
    )

    const response = await this.transport.writeFile()

    console.log(
      'WRITE FILE DONE'
    )

    console.log(response)

    return response
  }

  async execute(
    command: string
  ): Promise<string> {

    return this.executeWithEnable(
      command
    )
  }
  
}