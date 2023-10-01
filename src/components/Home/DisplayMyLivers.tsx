import { useEffect, useState } from 'react'

import useLiveChannels from '@/hooks/useLiveChannels.tsx'

import { setChromeStorage } from '@/helpers/chrome-api.ts'
import { databaseSearch } from '@/helpers/database.ts'
import Liver from '@/layouts/Liver.tsx'

import { LiveChannel } from '@/types/api.ts'
import {
  ChromeStorageData,
  MyLivers,
  VTuberFromStorage,
} from '@/types/chrome-api.ts'

const DisplayMyLivers = () => {
  const [displayLivers, setDisplayLivers] = useState<ChromeStorageData>({})
  const { data, isLoading } = useLiveChannels()

  useEffect(() => {
    getMyLivers()
  }, [])

  useEffect(() => {
    getLiveStatus()
  }, [data])

  const getMyLivers = () => {
    chrome.storage.local.get(['myLivers', 'customList'], (data) => {
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
        if (key === data[index]?.channel.id && data[index]?.status === 'live') {
          tempLiveStatus = {
            ...tempLiveStatus,
            [key]: {
              ...value,
              status: 'live',
              title: data[index]?.title,
              started: data[index]?.start_actual,
              scheduled: data[index]?.start_scheduled,
              viewers: data[index]?.live_viewers,
              org: data[index]?.channel.org,
              fullName: data[index]?.channel.name,
            },
          }
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
      }
    }
  }

  if (!Object.keys(displayLivers).length) {
    return (
      <span className='flex justify-center opacity-40'>
        <p>Looks like your list is empty..</p>
      </span>
    )
  }

  return (
    <section className='flex flex-wrap justify-center gap-3 pb-4 pt-14'>
      {Object.keys(displayLivers).map((channelID) => {
        return (
          <div key={channelID}>
            <Liver
              member={
                displayLivers[channelID] as LiveChannel & VTuberFromStorage
              }
              loading={isLoading}
              path='home'
            />
          </div>
        )
      })}
    </section>
  )
}

export default DisplayMyLivers
