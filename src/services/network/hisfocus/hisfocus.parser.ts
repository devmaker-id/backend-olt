import { ConnectionState } from '@prisma/client'
import { HisfocusOpticalInfo } from './hisfocus.types'
import { generateNameOnu, normalizeMac } from '../../../utils/normalize-onu'
import type {
  ParsedOnuList,
  OltOpticalInfo
} from './hisfocus.types'

export class HisfocusParser {
  static parseNetworkInfo(raw: string) {
      throw new Error('Method not implemented.')
  }
  static parseSystemInfo(
    response: string
  ) {
    const lines = response
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const data: any = {}

    for (const line of lines) {
      const match = line.match(
        /^(.+?)\s+:\s+(.+)$/
      )

      if (match) {
        const key = match[1]
          .trim()
          .replace(/\s+/g, '_')
          .toLowerCase()

        data[key] = match[2].trim()
      }
    }

    return data
  }

  static parseOpticalInfo(
    response: string
  ): HisfocusOpticalInfo {

    const lines = response
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const opticalData: any = {}

    for (const line of lines) {

      const match = line.match(
        /^(.+?)\s+:\s+(.+)$/
      )

      if (match) {

        const key = match[1]
          .trim()
          .replace(/\s+/g, '_')
          .toLowerCase()

        opticalData[key] =
          match[2].trim()
      }
    }

    return {
      status: 'OK',
      temperature: opticalData.temperature,
      voltage: opticalData.voltage,
      txbias: opticalData.txbias,
      txpower: opticalData.txpower,
      rxpower: opticalData.rxpower
    }
  }

  static parseOnuInfo(
    response: string
  ) {
    const lines = response.split('\n').map((line) => line.trim()).filter(Boolean)
    const data: any = {}
    for (const line of lines) {
      const match = line.match(/^(.+?)\s+:\s+(.+)$/)

      if (match) {
        const key = match[1]
          .trim()
          .replace(/\s+/g, '_')
          .replace(/-/g, '_')
          .toLowerCase()

        data[key] = match[2].trim()
      }
    }

    let connectionState:
  ConnectionState =
    'UNKNOWN'

    switch (data.ctc_autoneg) {
      case 'CtcNegDone':
        connectionState = 'ONLINE'
        break
      case 'MpcpDiscovery':
        connectionState = 'ONU_POWER_OFF'
        break
      case '--':
        connectionState = 'FIBER_LOS'
        break
      case 'CtcInfo':
        connectionState = 'ONU_AUTH_FAILED'
        break
    }

    const isOnline = connectionState === 'ONLINE'

    return {
      onu_id: data.onu_id,
      onu_mac: data.onu_mac,
      onu_name: data.onu_name,
      online_status: data.online_status,
      activate_status: data.activate_status,
      firmware_version: data.firmware_version,
      chip_id: data.chipid,
      model_string: data.model_string,
      onu_type: data.onu_type,
      ge_number: data.ge_number,
      fe_number: data.fe_number,
      pots_number: data.pots_number,
      wifi: data.wifi,
      catv: data.catv,
      ctc_autoneg: data.ctc_autoneg,
      connectionState,
      is_online: isOnline,
      first_uptime: data.first_uptime,
      last_uptime: data.last_uptime,
      last_offtime: data.last_offtime,
      online_time: data.onlinetime,
      offline_event_count: data.offlineeventcnt
    }
  }

  static parseOnuList(
    output: string
  ): ParsedOnuList[] {
  
    const result: ParsedOnuList[] = []
  
    output = output.replace(
        /\x1B\[[0-9;]*[A-Za-z]/g,
        ''
      ).replace(
        /\x1B\[[0-9;]*[A-Za-z]/g,
        ''
      ).replace(
        /---\s*Enter Key To Continue\s*----/gi,
        ''
      )
  
    const lines = output.split('\n')
  
    for (const rawLine of lines) {
  
      const line =
        rawLine.trim()
  
      if (
        !line.match(
          /^\d+\/\d+:\d+/
        )
      ) {
        continue
      }
  
      const parts =
        line.split(/\s+/)
  
      if (
        parts.length < 12
      ) {
        continue
      }
  
      const onu = parts[0]
      const onuName = parts.slice(12).join(' ')
  
      const [
        port,
        onuId
      ] = onu.split(':')
  
      result.push({
        port,
        onuId,
        macAddress: normalizeMac(parts[1]),
        status: parts[2],
        ctcStatus: parts[8],
        onuComtName: generateNameOnu(onuName),
        name: onuName
      })
    }
  
    return result
  }

  static parseOltOpticalInfo(
    raw: string,
    port: string
  ): OltOpticalInfo {

    const getValue = (
      pattern: RegExp
    ) => {
      const match = raw.match(pattern)
      return match?.[1]?.trim() ?? ''
    }

    const temperature = getValue( /Temperature\s*:\s*(.+)/i )
    const temp = parseFloat( temperature )

    return {
      port,
      status: temp >= 255 ? 'NO_MODULE' : 'ONLINE',
      temperature,
      voltage: getValue(/Voltage\s*:\s*(.+)/i),
      txBias: getValue(/TxBias\s*:\s*(.+)/i),
      txPower: getValue(/TxPower\s*:\s*(.+)/i)
    }
  }

}