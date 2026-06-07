import { Olt }
  from '@prisma/client'

import { TelnetTransport }
  from '../transport/telnet.transport_v1'

class ConnectionManager {
  private connections = new Map<
    string,
    TelnetTransport
  >()

  async getConnection(
    olt: Olt
  ) {
    const existing =
      this.connections.get(olt.id)

    if (
      existing &&
      existing.isConnected()
    ) {
      return existing
    }

    const transport =
      new TelnetTransport()

    await transport.connect({
      host: olt.ipAddress,

      port: olt.telnetPort,

      username: olt.username,

      password: olt.password
    })

    this.connections.set(
      olt.id,
      transport
    )

    return transport
  }

  async disconnect(
    oltId: string
  ) {
    const connection =
      this.connections.get(oltId)

    if (!connection) {
      return
    }

    await connection.disconnect()

    this.connections.delete(oltId)
  }

  async disconnectAll() {
    for (const [
      oltId,
      connection
    ] of this.connections) {

      await connection.disconnect()

      this.connections.delete(
        oltId
      )
    }
  }
}

export const connectionManager =
  new ConnectionManager()