import React from 'react'
import { Shipment } from '../../types'

type Props = {
  data: Shipment
}

export type Event = {
  eventName: string
  portName: string
  startAt: Date
  endAt: Date
  duration: number
}

const JourneyTable = ({ data }: Props) => {
  const { orders, portCalls } = data

  const events = []

  return <table className='table-auto'></table>
}

export default JourneyTable
