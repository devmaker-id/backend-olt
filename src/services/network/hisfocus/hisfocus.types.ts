export type OpticalStatus = | 'OK' | 'UNKNOWN'

export interface OltOpticalInfo {
  port: string
  status: 'ONLINE' | 'NO_MODULE'
  temperature: string
  voltage: string
  txBias: string
  txPower: string
}

export interface HisfocusOnuInfo {
    onu_id: string,
    onu_mac: string,
    onu_name: string,
    connectionState: string,
    frimware_version: string,
    model_string: string,
    onu_type: string
}

export interface HisfocusOpticalInfo {
  status: OpticalStatus
  temperature: string | null
  voltage: string | null
  txbias: string | null
  txpower: string | null
  rxpower: string | null
}

export const UNKNOWN_OPTICAL:
  HisfocusOpticalInfo = {
  status: 'UNKNOWN',
  temperature: null,
  voltage: null,
  txbias: null,
  txpower: null,
  rxpower: null
}

export interface ParsedOnuList {
  port: string
  onuId: string
  macAddress: string
  status: string
  ctcStatus?: string
  onuComtName?: String
  name?: string
}