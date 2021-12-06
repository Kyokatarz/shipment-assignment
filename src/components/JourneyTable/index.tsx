import React from 'react'
import { Shipment } from '../../types'
import TableRow from '../TableRow'

type Props = {
  data: Shipment
}

export type Event = {
  eventName: 'Discharging' | 'Loading' | 'Idle' | 'Laden' | 'Ballast'
  portName?: string
  orderId?: string
  startAt: number
  endAt: number
  duration: number
}

const tableHead = ['Event', 'Order ID', 'Port', 'Start', 'End', 'Duration']

const JourneyTable = ({ data }: Props) => {
  const { orders, portCalls } = data

  function mappingToEvents() {
    const events: Event[] = []
    let cargosOnShip: string[] = []

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

      //Find all of the loading task with given portCallId */
      const allLoadingOrders = orders.filter(
        (order) => order.loading.portCallId === portCallId
      )

      //For each discharge order, push an event
      //? Code explain: destructure orderId, and "duration" from "discharging" inner object,
      allDischargingOrders.forEach(({ orderId, discharging: { duration } }) => {
        //Push an event called Discharging
        const taskStart = startAt + timeUsed
        const taskEnd = taskStart + duration

        events.push({
          eventName: 'Discharging',
          portName,
          orderId,
          startAt: taskStart,
          endAt: taskEnd,
          duration: duration,
        })

        //The duration of the task is added to timeUsed
        timeUsed += duration

        //Remove that cargo into the cargo array
        cargosOnShip = cargosOnShip.filter((id) => id !== orderId)
      })

      //The same for loading orders
      allLoadingOrders.forEach(({ orderId, loading: { duration } }) => {
        const taskStart = startAt + timeUsed
        const taskEnd = taskStart + duration

        events.push({
          eventName: 'Loading',
          portName,
          orderId,
          startAt: taskStart,
          endAt: taskEnd,
          duration: duration,
        })
        timeUsed += duration

        //Add that cargo into the cargo array
        cargosOnShip.push(orderId)
      })

      //After loading and discharging, if there is still time left, then the vessle is idle-ing, push an event "Idle"
      if (totalTime - timeUsed > 0) {
        events.push({
          eventName: 'Idle',
          portName: portName,
          startAt: startAt + timeUsed,
          endAt,
          duration: totalTime - timeUsed,
        })
      }

      //After ending all task (includes idling), check the next port call.
      //The next port call must be the one that has an arrival time just after the ending time of the previous portcall.

      //So we sort the portCalls by chronological order.
      const sortedPortCall = portCalls.sort(
        (a, b) => a.arrivingAt.getTime() - b.arrivingAt.getTime()
      )
      //And find the first portCall that has the time just later than the leaving time
      const nextPortCall = sortedPortCall.find(
        (portCall) => portCall.arrivingAt.getTime() > leavingAt.getTime()
      )

      //And we'll have the nextArrivalTime
      const nextArrivalTime = nextPortCall?.arrivingAt.getTime()

      //The duration of the travel starts from the leaving time, and finishes at the the next arrival time
      //Keep in mind that if there is no nextArrivalTime, then it's the last portCall. No need to push the travelling event.
      nextArrivalTime &&
        events.push({
          eventName: cargosOnShip.length > 0 ? 'Laden' : 'Ballast',
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
