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

export interface OnuReplacement {

  id: string

  endpointId: string

  oldOnuId: string

  newOnuId: string

  reason: string

  replacedBy: string | null

  createdAt: string

  endpoint: {

    id: string

    internetNo: string

    name: string

    address: string
  }

  oldOnu: {

    onuId: string

    onuMac: string

    onuName: string

    model: string
  }

  newOnu: {

    onuId: string

    onuMac: string

    onuName: string

    model: string
  }
}