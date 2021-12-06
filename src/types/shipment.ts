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
  discharging: Task
  loading: Task
  orderId: string
}

export type Task = {
  portCallId: number
  duration: number
}
