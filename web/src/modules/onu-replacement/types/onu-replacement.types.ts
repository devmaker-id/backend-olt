export interface ReplaceOnuPayload {

  endpointId: string

  unauthorizedOnuId: string

  reason?: string
}

export interface ReplaceOnuResponse {

  success: boolean

  message: string

  data: {

    internetNo: string

    oldOnuMac: string

    newOnuMac: string

    port: string
  }
}