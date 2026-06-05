export interface Endpoint {
  id: string
  internetNo: string
  name: string
  address: string

  onus: {
    id: string
    connectionState: string
    rxPower: string | null
  }[]
}