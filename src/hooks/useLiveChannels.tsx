import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import { apiHeaders, liveEndpoint } from '@/constants/api.ts'

import { LiveChannel, LiveChannels } from '@/types/api.ts'

const useLiveChannels = (): LiveChannels => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<LiveChannel[]>([])

  const config = {
    url: liveEndpoint,
    headers: apiHeaders,
  }

  const reExecute = async () => {
    try {
      setLoading(true)
      const data: AxiosResponse = await axios.request(config)
      setData(data.data as LiveChannel[])
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }

  useEffect(() => {
    void reExecute()
  }, [])

  return { data, isLoading, reExecute }
}

export default useLiveChannels
