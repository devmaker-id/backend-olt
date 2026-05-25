export interface ParsedSyslog {
  oltName: string
  timestamp: string
  eponPort: string
  onuId: string
  onuMac: string
  onuName: string | null
  status: 'linkup' | 'linkdown'
  isRegistered: boolean
  sourceIp: string
  raw: string
}