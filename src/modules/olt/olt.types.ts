export interface CreateOltDto {
  name: string
  syslogName: string
  ipAddress: string
  telnetPort?: number
  username: string
  password: string
  vendor: string
  location?: string
}

export interface UpdateOltDto {
  name?: string
  ipAddress?: string
  telnetPort?: number
  username?: string
  password?: string
  vendor?: string
  location?: string
}

export interface OltParams {
  id: string
}