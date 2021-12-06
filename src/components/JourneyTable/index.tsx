import React from 'react'
import { Shipment } from '../../types'
import TableRow from '../TableRow'

type Props = {
  data: Shipment
}

export type Event = {
  eventName: 'Discharging' | 'Loading' | 'Idle' | 'Laden' | 'Ballast'
  portName?: string
  startAt: number
  endAt: number
  duration: number
}

const tableHead = ['Event', 'Port', 'Start', 'End', 'Duration']

const JourneyTable = ({ data }: Props) => {
  const { orders, portCalls } = data

  function mappingToEvents() {
    const events: Event[] = []

    portCalls.forEach(({ portCallId, arrivingAt, leavingAt, portName }) => {
      //Converting these Date into number for easy manipulation
      const startAt = arrivingAt.getTime()
      const endAt = leavingAt.getTime()

      //Total time of the vessel spent in a port
      const totalTime = endAt - startAt

      //Total time used by each discharge/loading task
      let timeUsed = 0

      //Find all of the discharging task with given portCallId
      const allDischargingOrders = orders.filter(
        (order) => order.discharging.portCallId === portCallId
      )

      //Find all of the discharging task with given portCallId */
      const allLoadingOrders = orders.filter(
        (order) => order.loading.portCallId === portCallId
      )

      //For each discharge orders, push an event
      //Also destructure orderId, and "duration" from "discharging" inner object,
      allDischargingOrders.forEach(({ discharging: { duration }, orderId }) => {
        //Push an event called Discharging
        const taskStart = startAt + timeUsed
        const taskEnd = taskStart + duration

        events.push({
          eventName: 'Discharging',
          portName,
          startAt: taskStart,
          endAt: taskEnd,
          duration: duration,
        })
        timeUsed += duration
      })

      //The same for loading orders
      allLoadingOrders.forEach(({ loading, orderId }) => {
        events.push({
          eventName: 'Loading',
          portName,
          startAt: startAt + timeUsed,
          endAt: startAt + timeUsed + loading.duration,
          duration: loading.duration,
        })
        timeUsed += loading.duration
      })

      if (totalTime - timeUsed !== 0) {
        events.push({
          eventName: 'Idle',
          portName: portName,
          startAt: startAt + timeUsed,
          endAt,
          duration: totalTime - timeUsed,
        })
      }

      const nextArrivalTime = portCalls
        .sort((a, b) => a.arrivingAt.getTime() - b.arrivingAt.getTime())
        .find(
          (portCall) => portCall.arrivingAt.getTime() > arrivingAt.getTime()
        )
        ?.arrivingAt.getTime()

      nextArrivalTime &&
        events.push({
          eventName: 'Laden',
          startAt: endAt,
          endAt: nextArrivalTime,
          duration: nextArrivalTime - endAt,
        })

      console.log({ nextArrivalTime })
    })

    return events.sort((a, b) => a.startAt - b.startAt)
  }

  const eventsToRender = mappingToEvents()

  return (
    <table className='table-auto table w-full'>
      <thead>
        {tableHead.map((title) => (
          <th key={title}>{title}</th>
        ))}
      </thead>
      <tbody>
        {eventsToRender.map((event) => (
          <TableRow {...event} />
        ))}
      </tbody>
    </table>
  )
}

export default JourneyTable
