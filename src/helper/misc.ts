import moment from 'moment'

export function sort(arr: any[], field: string, order: 'asc' | 'desc') {
  return arr.sort((a, b) => {
    if (order === 'asc') {
      return a[field] > b[field] ? 1 : -1
    } else {
      return a[field] > b[field] ? -1 : 1
    }
  })
}

/**Return a readable date from Date number
 * @returns 'DD-MM-YYYY, HH:mm'
 */
export const formatToReadableDate = (date: number) => {
  return moment(date).format('DD-MM-YYYY, HH:mm')
}

/**Return a readable duration from Date number
 * @returns millisecond => hours
 */
export const formatToReadableDuration = (time: number) => {
  return moment.duration(time, 'milliseconds').asHours()
}

/**Convert Date array into number array
 * @arguments Date[]
 * @returns number[]
 */
export const getDateAsNumber = (...args: Date[]) => {
  return [...args].map((arg) => arg.getTime())
}

/**
 * Get start and end time given duration
 * @param startAt Starting time
 * @param duration Duration time
 * @returns `{ startAt:number, endAt:number }`
 */
export const getStartAndEndTime = (startAt: number, duration: number) => {
  return { start: startAt, end: startAt + duration }
}
