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

const tableHead = ['Event', 'Port', 'Start', 'End', 'Duration']

const JourneyTable = ({ data }: Props) => {
  const { orders, portCalls } = data

  const events = []

  return (
    <table className='table-auto bg-black'>
      <thead>
        {tableHead.map((title) => (
          <th key={title}>{title}</th>
        ))}
      </thead>
    </table>
  )
}

export default JourneyTable
