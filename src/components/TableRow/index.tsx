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
    <tr className='border border-black even:bg-blue-100 odd:bg-blue-200'>
      <td className='pl-2'>{eventName}</td>
      <td className='text-center'>{portName}</td>
      <td className='text-center'>{orderId}</td>
      <td className='text-center'>{formatToReadableDate(startAt)}</td>
      <td className='text-center'>{formatToReadableDate(endAt)}</td>
      <td className='text-center'>{formatToReadableDuration(duration)}</td>
    </tr>
  )
}

export default TableRow
