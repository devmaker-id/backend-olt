import net from 'net'

export interface TelnetConnectOptions {
  host: string
  port: number
  username: string
  password: string
}

export class TelnetTransport {
  private socket: net.Socket | null =
    null
  private buffer = ''
  private connected = false
  private usernameSent = false
  private passwordSent = false
  private commandQueue: Array<{
    command: string
    timeout: number
    resolve: (
      response: string
    ) => void
    reject: (
      error: Error
    ) => void
  }> = []
  private commandRunning = false
  private responseResolver:
    ((response: string) => void)
      | null = null
  private rejectConnect:
    ((error: Error) => void)
      | null = null
  private host = ''
  async connect(
    options: TelnetConnectOptions
  ) {
    if (this.connected) {
      return
    }
    this.resetState()
    this.host = options.host
    this.socket = new net.Socket()
    return new Promise<void>(
      (resolve, reject) => {
      this.rejectConnect = reject
      this.socket!.connect(
        options.port,
        options.host,
        () => {
        console.log(
          `TELNET CONNECTED ${options.host}`
        )
      })
      this.socket!.setEncoding(
        'ascii'
      )
      this.socket!.on(
        'data',
        (data) => {
        this.handleData(
          data.toString(),
          options,
          resolve
        )
      })
      this.socket!.on(
        'error',
        (error) => {
        this.connected = false
        reject(error)
      })
      this.socket!.on(
        'close',
        () => {
        this.connected = false
        console.log(
          `TELNET CLOSED ${options.host}`
        )
      })
    })
  }

  private handleData(
    data: string,
    options: TelnetConnectOptions,
    resolve: () => void
  ) {
    this.buffer += data
    if (
      !this.usernameSent &&
      /Username:/i.test(
        this.buffer
      )
    ) {
      this.socket?.write(
        options.username +
        '\r\n'
      )
      this.usernameSent = true
      this.buffer = ''
      return
    }
    if (
      this.usernameSent &&
      !this.passwordSent &&
      /Password:/i.test(
        this.buffer
      )
    ) {
      this.socket?.write(
        options.password +
        '\r\n'
      )
      this.passwordSent = true
      this.buffer = ''
      return
    }
    if (
      /Incorrect passwd!/i
      .test(this.buffer)
    ) {
      if (this.rejectConnect) {
        this.rejectConnect(
          new Error(
            'INVALID_TELNET_CREDENTIAL'
          )
        )
      }
      this.disconnect()
      return
    }
    if (
      /OLT_.*[>#]/i
      .test(this.buffer)
    ) {
      if (!this.connected) {
        this.connected = true
        console.log(
          `TELNET READY ${this.host}`
        )
        resolve()
        this.buffer = ''
        return
      }
      if (
        this.commandRunning &&
        this.responseResolver
      ) {
        if (
          !this.buffer.includes(
            '--- Enter Key To Continue ----'
          )
        ) {
          this.responseResolver(
            this.buffer
          )
          this.responseResolver =
            null
          this.commandRunning =
            false
          this.buffer = ''
          this.executeNextCommand()
        }
      }
    }
  }

  async writeFile() {

    return new Promise<string>(
      (resolve, reject) => {

        let buffer = ''

        const timeout =
          setTimeout(() => {

            reject(
              new Error(
                'WRITE FILE TIMEOUT'
              )
            )

          }, 20000)

        const onData = (
          data: Buffer
        ) => {

          const text =
            data.toString()

          buffer += text

          console.log(text)

          if (
            buffer.includes(
              'Configuration file saved ok!'
            )
          ) {

            clearTimeout(timeout)

            this.socket?.off(
              'data',
              onData
            )
            resolve(buffer)
          }
        }

        this.socket?.on(
          'data',
          onData
        )

        this.socket?.write(
          'write file\r\n'
        )
      }
    )
  }

  async sendCommand(
    command: string,
    timeout = 5000
  ): Promise<string> {

    if (!this.connected) {
      throw new Error(
        'TELNET_NOT_CONNECTED'
      )
    }

    return new Promise(
      (resolve, reject) => {

      this.commandQueue.push({
        command,
        timeout,
        resolve,
        reject
      })

      if (
        !this.commandRunning
      ) {

        this.executeNextCommand()
      }
    })
  }

  private executeNextCommand() {

    if (
      this.commandQueue.length === 0
    ) {
      return
    }

    const task =
      this.commandQueue.shift()

    if (!task) {
      return
    }

    this.commandRunning = true

    console.log(
      `TELNET CMD ${task.command}`
    )

    this.socket?.write(
      task.command + '\r\n'
    )

    this.responseResolver =
      task.resolve

    setTimeout(() => {

      if (
        this.commandRunning
      ) {

        this.commandRunning =
          false

        task.reject(
          new Error(
            'TELNET_COMMAND_TIMEOUT'
          )
        )

        this.responseResolver =
          null
      }

    }, task.timeout)
  }

  private resetState() {
    this.buffer = ''
    this.connected = false
    this.usernameSent = false
    this.passwordSent = false
    this.commandRunning = false
    this.responseResolver = null
  }

  isConnected() {
    return this.connected
  }

  async disconnect() {

    if (!this.socket) {
      return
    }

    this.socket.write(
      'quit\r\n'
    )

    this.socket.end()
    this.connected = false
  }
}