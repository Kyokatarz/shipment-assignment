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

export const formatToReadableDate = (date: number) => {
  return moment(date).format('DD-MM-YYYY, HH:mm')
}

export const formatToReadableDuration = (time: number) => {
  console.log('timeInMoment', time)
  return moment.duration(time, 'milliseconds').asHours()
}
