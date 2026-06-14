import type {
  OltPlatform,
  OltConnectionType
} from '@prisma/client'

export interface CreateOltDto {
  name: string
  syslogName: string

  ipAddress: string
  managementPort: number

  username: string
  password: string

  vendor: string

  platform: OltPlatform
  connectionType: OltConnectionType

  location?: string
}

export interface UpdateOltDto {
  name?: string
  syslogName?: string

  ipAddress?: string
  managementPort?: number

  username?: string
  password?: string

  vendor?: string

  platform?: OltPlatform
  connectionType?: OltConnectionType

  location?: string
}

export interface OltParams {
  id: string
}