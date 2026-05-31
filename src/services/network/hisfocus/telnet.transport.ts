import net from 'net'

export interface ConnectOptions {
  host: string
  port: number
}

export class TelnetTransport {

  private socket: net.Socket | null = null
  private lastDataAt = Date.now()
  private buffer = ''

  async connect(
    options: ConnectOptions
  ) {

    if (this.socket) {
      return
    }

    this.socket = new net.Socket()

    return new Promise<void>(
      (resolve, reject) => {

        this.socket!.connect(
          options.port,
          options.host,
          () => {

            console.log(
              `TELNET CONNECTED ${options.host}`
            )

            resolve()
          }
        )

        this.socket!.on(
            'data',
            buffer => {
                const text = buffer.toString()
                this.buffer += text
                this.lastDataAt = Date.now()
            }
        )

        this.socket!.on(
          'error',
          reject
        )
      }
    )
  }

  write(
    data: string
  ) {

    this.socket?.write(data)
  }

  onData(
    listener: (
      data: string
    ) => void
  ) {

    this.socket?.on(
      'data',
      buffer =>
        listener(
          buffer.toString()
        )
    )
  }

  offData(
    listener: (
      data: string
    ) => void
  ) {

    this.socket?.off(
      'data',
      listener as any
    )
  }

  getLastDataAt() {
    return this.lastDataAt
  }
  getBuffer() {
    return this.buffer
  }
  clearBuffer() {
    this.buffer = ''
    this.lastDataAt = Date.now()
  }

  onceData(): Promise<string> {
    return new Promise(
        resolve => {
            const listener = (data: string) => {
                this.offData(listener)
                resolve(data)
            }
        this.onData(listener)
        }
    )
  }

  async waitFor(
    matcher: RegExp,
    timeout = 5000
  ) {
    return new Promise<string>(
        (
            resolve,
            reject
        ) => {
            const started = Date.now()
            const timer = setInterval(() => {
                if (matcher.test(this.buffer)) {
                    clearInterval(timer)
                    resolve(this.buffer)
                    return
                }
                if (Date.now() - started > timeout) {
                    clearInterval(timer)
                    reject(
                        new Error('WAIT_TIMEOUT')
                    )
                }
            }, 50)
        }
    )
  }

  async disconnect() {
    if (!this.socket) {
      return
    }
    this.socket.destroy()
    this.socket = null
    console.log(
      'TELNET CLOSED'
    )
  }
}