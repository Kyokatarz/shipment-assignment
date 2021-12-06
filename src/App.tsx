import React, { useEffect, useState } from 'react'

import JourneyTable from './components/JourneyTable'
import { useData } from './hooks/useData'

function App() {
  const { data, error } = useData()

  if (error?.error) {
    return <div>{error.error}</div>
  }

  return <div className='App'>{data && <JourneyTable data={data} />}</div>
}

export default App
