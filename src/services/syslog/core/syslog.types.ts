export interface ParsedSyslog {
  oltName: string
  timestamp: string
  eponPort: string
  onuId: string
  onuMac: string
  onuName: string | null
  status: 'linkup' | 'linkdown'
  sourceIp: string
  raw: string
}