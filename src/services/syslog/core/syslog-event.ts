export type SyslogEventType =
  | 'ONU_LINKUP'
  | 'ONU_LINKDOWN'
  | 'ONU_LOS'
  | 'ONU_DYING_GASP'
  | 'ONU_REGISTER'
  | 'ONU_UNREGISTER'
  | 'WEB_LOGIN'
  | 'WEB_LOGOUT'
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
  onuName?: string
  payload?: Record<string, unknown>
}