import React, { useCallback } from 'react'
import { getDateAsNumber, getStartAndEndTime } from '../../helper/misc'
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

const tableHead = ['Event', 'Port', 'Order ID', 'Start', 'End', 'Duration (h)']

const JourneyTable = ({ data: { orders, portCalls } }: Props) => {
  const mappingToEvents = useCallback(() => {
    const events: Event[] = []
    let cargosOnShip: string[] = []

    portCalls.forEach(({ portCallId, arrivingAt, leavingAt, portName }) => {
      //Converting these Date into number for easy manipulation
      const [startAt, endAt] = getDateAsNumber(arrivingAt, leavingAt)

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

      //? Code explain: destructure orderId, and "duration" from "discharging" inner object,
      //For each discharge order, push an event
      allDischargingOrders.forEach(({ orderId, discharging: { duration } }) => {
        //Push an event called Discharging
        const { start, end } = getStartAndEndTime(startAt + timeUsed, duration)

        events.push({
          eventName: 'Discharging',
          portName,
          orderId,
          startAt: start,
          endAt: end,
          duration: duration,
        })

        //The duration of the task is added to timeUsed
        timeUsed += duration

        //Remove that cargo from the cargo array
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

      if (!nextPortCall) return

      //And we'll have the nextArrivalTime
      const [nextArrivalTime] = getDateAsNumber(nextPortCall.arrivingAt)

      //The duration of the travel starts from the leaving time, and finishes at the the next arrival time
      //Keep in mind that if there is no nextArrivalTime, then it's the last portCall. No need to push the travelling event.
      const previousEndAt = endAt
      nextArrivalTime &&
        events.push({
          eventName: cargosOnShip.length > 0 ? 'Laden' : 'Ballast',
          startAt: endAt,
          endAt: nextArrivalTime,
          duration: nextArrivalTime - previousEndAt,
        })
    })
    return events.sort((a, b) => a.startAt - b.startAt)
  }, [orders, portCalls])

  const eventsToRender = React.useMemo(
    () => mappingToEvents(),
    [mappingToEvents]
  )

  return (
    <div className='w-full flex justify-center'>
      <table className='table-auto table w-3/4'>
        <thead>
          {tableHead.map((title) => (
            <th key={title} className='text-center bg-blue-600 text-white'>
              {title}
            </th>
          ))}
        </thead>
        <tbody>
          {eventsToRender.map((event) => (
            <TableRow {...event} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(JourneyTable)
