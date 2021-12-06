import React from 'react'

import { Event } from '../JourneyTable'
import {
  formatToReadableDate,
  formatToReadableDuration,
} from '../../helper/misc'

const TableRow = ({
  eventName,
  startAt,
  endAt,
  duration,
  portName,
  orderId,
}: Event) => {
  return (
    <tr>
      <td className='mx-4'>{eventName}</td>
      <td className='mx-4'>{portName}</td>
      <td className='mx-4'>{orderId}</td>
      <td className='mx-4'>{formatToReadableDate(startAt)}</td>
      <td className='mx-4'>{formatToReadableDate(endAt)}</td>
      <td className='mx-4'>{formatToReadableDuration(duration)}</td>
    </tr>
  )
}

export default TableRow
