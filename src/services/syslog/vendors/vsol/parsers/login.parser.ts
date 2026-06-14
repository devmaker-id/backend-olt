import { SyslogEvent } from '../../../core/syslog-event'

export class LoginParser {

  static parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    // WEB LOGIN
    const webLogin =
      log.match(
        /([A-Z0-9\-_]+)\s+auditd\[\d+\]:\s+User Login\s+User\s+(\S+)\s+logged in from\s+([0-9.]+)\s+on web\./i
      )

    if (webLogin) {

      return {

        type: 'WEB_LOGIN',

        oltName:
          webLogin[1],

        sourceIp,

        timestamp:
          new Date(),

        rawLog:
          log,

        payload: {

          username:
            webLogin[2],

          clientIp:
            webLogin[3],

          accessType:
            'WEB'

        }

      }

    }

    // SSH LOGIN

    const sshLogin =
      log.match(
        /([A-Z0-9\-_]+)\s+auditd\[\d+\]:\s+User Login\s+User\s+(.+?)-([0-9.]+)-ssh log in/i
      )

    if (sshLogin) {

      return {

        type: 'SSH_LOGIN',

        oltName:
          sshLogin[1],

        sourceIp,

        timestamp:
          new Date(),

        rawLog:
          log,

        payload: {

          username:
            sshLogin[2],

          clientIp:
            sshLogin[3],

          accessType:
            'SSH'

        }

      }

    }

    // SSH LOGOUT

    const sshLogout =
      log.match(
        /([A-Z0-9\-_]+)\s+auditd\[\d+\]:\s+User Logout\s+User\s+(.+?)-([0-9.]+)-ssh log out/i
      )

    if (sshLogout) {

      return {

        type: 'SSH_LOGOUT',

        oltName:
          sshLogout[1],

        sourceIp,

        timestamp:
          new Date(),

        rawLog:
          log,

        payload: {

          username:
            sshLogout[2],

          clientIp:
            sshLogout[3],

          accessType:
            'SSH'

        }

      }

    }

    return null

  }

}