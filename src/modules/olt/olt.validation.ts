import { prisma } from '../../config/prisma'
import { CreateOltDto } from './olt.types'

export async function validateDuplicateOlt(
  data: CreateOltDto
) {

  const duplicate =
    await prisma.olt.findFirst({
      where: {
        OR: [
          {
            name: data.name
          },
          {
            syslogName:
              data.syslogName
          },
          {
            ipAddress:
              data.ipAddress
          }
        ]
      }
    })

  if (!duplicate) {
    return
  }

  if (
    duplicate.name ===
    data.name
  ) {

    throw new Error(
      'OLT_NAME_ALREADY_EXISTS'
    )
  }

  if (
    duplicate.syslogName ===
    data.syslogName
  ) {

    throw new Error(
      'OLT_SYSLOG_NAME_ALREADY_EXISTS'
    )
  }

  if (
    duplicate.ipAddress ===
    data.ipAddress
  ) {

    throw new Error(
      'OLT_IP_ALREADY_EXISTS'
    )
  }
}