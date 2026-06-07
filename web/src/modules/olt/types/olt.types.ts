export interface Olt {

  id: string

  name: string

  syslogName: string

  ipAddress: string

  telnetPort: number

  username: string

  password: string

  vendor: string

  location: string

  createdAt: string

  updatedAt: string
}
export interface OltOptical {

  port: string

  status:
    | 'ONLINE'
    | 'NO_MODULE'

  temperature: string

  voltage: string

  txBias: string

  txPower: string
}