import { useEffect, useState } from 'react'
import pretendToFetchData from '../helper/api'
import { Shipment } from '../types'

type Error = {
  error: string
}

/**Fetch data from API */
export const useData = () => {
  const [data, setData] = useState<Shipment>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFetched = await pretendToFetchData()
        setData(dataFetched)
      } catch (e) {
        setError({ error: 'Something went wrong' })
      }
    }

    fetchData()
  }, [])

  return { data, error }
}
