export type SyslogEventType =

  | 'ONU_LINKUP'
  | 'ONU_LINKDOWN'

  | 'ONU_ONLINE'
  | 'ONU_OFFLINE'

  | 'ONU_REGISTER'
  | 'ONU_UNREGISTER'

  | 'ONU_LOS'
  | 'ONU_DYING_GASP'

  | 'WEB_LOGIN'
  | 'WEB_LOGOUT'

  | 'SSH_LOGIN'
  | 'SSH_LOGOUT'

  | 'WEB_CONNECTION'
  | 'WEB_DISCONNECTION'

  | 'SYSTEM'

  | 'UNKNOWN'

export interface SyslogEvent {
  type: SyslogEventType
  oltName: string
  sourceIp: string
  timestamp: Date
  rawLog: string
  eponPort?: string
  onuId?: string
  onuMac?: string
  serialNumber?: string
  onuName?: string
  payload?: Record<string, unknown>
}