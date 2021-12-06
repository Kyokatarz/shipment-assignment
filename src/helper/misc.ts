export function sort(arr: any[], field: string, order: 'asc' | 'desc') {
  return arr.sort((a, b) => {
    if (order === 'asc') {
      return a[field] > b[field] ? 1 : -1
    } else {
      return a[field] > b[field] ? -1 : 1
    }
  })
}
