/**A Journey type */
export type Shipment = {
  portCalls: PortCall[]
  orders: Order[]
}

export type PortCall = {
  portCallId: number
  arrivingAt: Date
  leavingAt: Date
  portName: string
}

export type Order = {
  loading: Loading
  orderId: string
}

export type Loading = {
  portCallId: number
  duration: number
}
