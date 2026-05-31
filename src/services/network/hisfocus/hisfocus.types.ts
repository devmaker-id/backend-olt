export type OpticalStatus = | 'OK' | 'UNKNOWN'

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