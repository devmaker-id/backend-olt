import { prisma } from '../../../config/prisma'
import { AlarmType } from '@prisma/client'

export class AlarmProcessor {

  static async create(
    params: {
      oltId: string
      onuId?: string
      type: AlarmType
      message: string
      sourceIp: string
      rawLog: string
    }
  ) {

    return prisma.alarmLog.create({
      data: {
        oltId: params.oltId,
        onuIdRef: params.onuId,
        type: params.type,
        message: params.message,
        sourceIp: params.sourceIp,
        rawLog: params.rawLog
      }
    })

  }

}