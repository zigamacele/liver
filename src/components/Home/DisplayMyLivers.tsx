import moment from 'moment/moment'
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
      // TODO: REMOVES STATUS FROM CUSTOMLIST-remove when most users switch to latest version. devtools -> analytics -> users
      if (
        data['customList'] &&
        Object.keys(data['customList'] as ChromeStorageData).length
      ) {
        const myCustomList = {
          ...(data['customList'] as ChromeStorageData),
        }
        Object.keys(myCustomList).forEach((channelID) => {
          delete myCustomList[channelID]?.status
          delete myCustomList[channelID]?.title
          delete myCustomList[channelID]?.started
          delete myCustomList[channelID]?.org
          delete myCustomList[channelID]?.viewers
        })
        void setChromeStorage('customList', myCustomList)
      }
      if (Array.isArray(data['myLivers'])) {
        // TODO: CONVERTS MYLIVERS FROM ARRAY TO OBJECT-remove when most users switch to latest version. devtools -> analytics -> users
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
    let tempLiveStatus: ChromeStorageData = {}
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
        } else if (
          key === data[index]?.channel.id &&
          !Object.keys(tempLiveStatus).includes(key)
        ) {
          tempLiveStatus = {
            ...tempLiveStatus,
            [key]: {
              ...value,
              status: 'offline',
              scheduled: data[index]?.start_scheduled,
            },
          }
        }
      }
      if (!Object.keys(tempLiveStatus).includes(key)) {
        tempLiveStatus = {
          ...tempLiveStatus,
          [key]: {
            ...value,
            status: 'offline',
          },
        }
      }

      if (
        Object.keys(tempLiveStatus).length === Object.keys(displayLivers).length
      ) {
        const output: ChromeStorageData = {}

        const sorted = Object.keys(tempLiveStatus).sort((a, b) => {
          const statusA = tempLiveStatus[a]?.status
          const statusB = tempLiveStatus[b]?.status
          const scheduledA = tempLiveStatus[a]?.scheduled
          const scheduledB = tempLiveStatus[b]?.scheduled

          if (statusA === 'live' && statusB !== 'live') {
            return -1
          }
          if (scheduledA && scheduledB) {
            return moment(scheduledA).valueOf() - moment(scheduledB).valueOf()
          }
          if (scheduledA) {
            return -1
          }
          return 0
        })

        sorted.forEach((key) => {
          output[key] = tempLiveStatus[key] as VTuberFromStorage
        })
        setDisplayLivers(output)
      }
    }
  }

  if (!Object.keys(displayLivers).length) {
    return (
      <section className='flex flex-col items-center gap-1 pb-10 pt-20'>
        <p className='text-lg font-light opacity-20'>¯\_(ツ)_/¯</p>
        <p className='opacity-60'>Looks like your list is empty..</p>
      </section>
    )
  }

  return (
    <section className='flex flex-wrap justify-center gap-3 pb-4 pt-14'>
      {Object.keys(displayLivers).map((channelID) => {
        return (
          <Liver
            key={channelID}
            member={displayLivers[channelID] as LiveChannel & VTuberFromStorage}
            loading={isLoading}
            path='home'
          />
        )
      })}
    </section>
  )
}

export default DisplayMyLivers
