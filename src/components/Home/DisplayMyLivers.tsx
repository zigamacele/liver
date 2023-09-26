import { useEffect, useState } from 'react'

import useLiveChannels from '@/hooks/useLiveChannels.tsx'

import { setChromeStorage } from '@/helpers/chrome-api.ts'
import { databaseSearch } from '@/helpers/database.ts'

import { ChromeStorageData, MyLivers } from '@/types/chrome-api.ts'

const DisplayMyLivers = () => {
  const [displayLivers, setDisplayLivers] = useState<ChromeStorageData>({})
  const { data } = useLiveChannels()

  useEffect(() => {
    getMyLivers()
  }, [])

  useEffect(() => {
    getLiveStatus()
  }, [data])

  const getMyLivers = () => {
    chrome.storage.local.get(['myLivers', 'customList'], function (data) {
      if (Array.isArray(data['myLivers'])) {
        // TODO: remove when most users switch to latest version. devtools -> analytics -> users
        const myLivers: MyLivers = {}
        data['myLivers'].forEach((channelID) => {
          myLivers[channelID as keyof typeof myLivers] = databaseSearch(
            channelID as string,
          )
        })
        void setChromeStorage('myLivers', myLivers)
        window.location.reload()
      } else {
        setDisplayLivers({
          ...(data['myLivers'] as ChromeStorageData),
          ...(data['customList'] as ChromeStorageData),
        })
      }
    })
  }

  const getLiveStatus = () => {
    let tempLiveStatus = {}
    for (const [key, value] of Object.entries(displayLivers)) {
      for (let index = 0; index < data.length; index++) {
        if (key === data[index]?.channel.id && data[index]?.status === 'live')
          tempLiveStatus = {
            ...tempLiveStatus,
            [key]: {
              ...value,
              status: 'live',
              title: data[index]?.title,
              started: data[index]?.start_actual,
              scheduled: data[index]?.start_scheduled,
              viewers: data[index]?.live_viewers,
              // TODO: check if this works
              org: displayLivers[key]?.org,
              fullName: data[index]?.channel.name,
            },
          }
      }
      if (!Object.keys(tempLiveStatus).includes(key))
        tempLiveStatus = {
          ...tempLiveStatus,
          [key]: { ...value, status: 'offline' },
        }

      if (
        Object.keys(tempLiveStatus).length === Object.keys(displayLivers).length
      ) {
        setDisplayLivers(tempLiveStatus)
        // setLoading(false)
      }
    }
  }

  if (!Object.keys(displayLivers).length) {
    return (
      <span className='mt-2 flex justify-center opacity-40'>
        <p>Looks like your list is empty..</p>
      </span>
    )
  }

  return (
    <section className='my-2 flex flex-wrap justify-center gap-3'>
      {Object.keys(displayLivers).map((channelID) => {
        return (
          <div key={channelID}>
            {/*<DisplayedLiver*/}
            {/*  member={displayLivers[channelID]}*/}
            {/*  loading={loading}*/}
            {/*  path='Home'*/}
            {/*/>*/}
          </div>
        )
      })}
    </section>
  )
}

export default DisplayMyLivers
