export interface ParsedSyslog {
  oltName: string
  timestamp: string
  portId: string
  onuId: string
  serialNumber: string
  onuMac: string
  onuName: string | null
  status: 'linkup' | 'linkdown'
  sourceIp: string
  raw: string
}