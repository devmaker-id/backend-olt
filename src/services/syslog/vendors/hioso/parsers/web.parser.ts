import { SyslogEvent } from '../../../core/syslog-event'

export class WebParser {

  static parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    const headerRegex =
      /^.*?\s([A-Z0-9_\-]+):\s+(.*)$/i

    const header =
      log.match(headerRegex)

    if (!header) {
      return null
    }

    const oltName =
      header[1]

    const message =
      header[2].trim()

    /*
     * WEB LOGIN
     *
     * User admin login from Web 172.10.0.247
     */

    const loginRegex =
      /^User\s+(\S+)\s+login\s+from\s+Web\s+([0-9.]+)$/i

    const loginMatch =
      message.match(loginRegex)

    if (loginMatch) {

      return {
        type: 'WEB_LOGIN',
        oltName,
        sourceIp,
        timestamp: new Date(),
        rawLog: log,
        payload: {
          username: loginMatch[1],
          clientIp: loginMatch[2]
        }

      }

    }

    /*
     * WEB CONNECTION
     *
     * New web connection , current web client=15
     */

    const connectionRegex =
      /^New web connection\s*,?\s*current web client=(\d+)$/i

    const connectionMatch =
      message.match(connectionRegex)

    if (connectionMatch) {

      return {
        type: 'WEB_CONNECTION',
        oltName,
        sourceIp,
        timestamp: new Date(),
        rawLog: log,
        payload: {
          currentClients:
            Number(connectionMatch[1])
        }

      }

    }

    /*
     * WEB DISCONNECTION
     *
     * Delete web connection 172.10.0.247, current web client=14
     */

    const disconnectRegex =
      /^Delete web connection\s+([0-9.]+)\s*,\s*current web client=(\d+)$/i

    const disconnectMatch =
      message.match(disconnectRegex)

    if (disconnectMatch) {

      return {
        type: 'WEB_DISCONNECTION',
        oltName,
        sourceIp,
        timestamp: new Date(),
        rawLog: log,
        payload: {
          clientIp: disconnectMatch[1],
          currentClients:
            Number(disconnectMatch[2])
        }

      }

    }

    return null

  }

}