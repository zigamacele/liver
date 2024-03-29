import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/20/solid'
import axios, { AxiosResponse } from 'axios'
import { duration } from 'moment/moment'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import { useTheme } from '@/lib/shadcn/theme-provider.tsx'
import { cn } from '@/lib/shadcn/utils.ts'

import useNavbarStore from '@/stores/navbar.ts'

import { apiHeaders, channelEndpoint } from '@/constants/api.ts'
import { createTab, setChromeStorage } from '@/helpers/chrome-api.ts'
import Twitter from '@/layouts/Icons/Twitter.tsx'
import InView from '@/layouts/InView.tsx'
import LiveStatus from '@/layouts/Liver/LiveStatus.tsx'

import { ChannelInformation, LiveChannel } from '@/types/api.ts'
import { ChromeStorageData, VTuberFromStorage } from '@/types/chrome-api.ts'

interface LiverProps {
  member: VTuberFromStorage & LiveChannel
  loading: boolean
  path: string
}

const Liver: React.FC<LiverProps> = ({ member, loading, path }) => {
  const [showLiveStatus, setShowLiveStatus] = useState(false)
  const [customList, setCustomList] = useState<ChromeStorageData>({})
  const [fetchingVTuber, setFetchingVTuber] = useState(false)

  const { setProperty } = useNavbarStore()
  const { theme } = useTheme()

  const checkMyLivers = () => {
    chrome.storage.local.get('customList', (data) => {
      if (data['customList']) {
        setCustomList(data['customList'] as ChromeStorageData)
      } else {
        void setChromeStorage('customList', {})
        setCustomList({})
      }
    })
  }

  useEffect(() => {
    if (path === 'all') checkMyLivers()
  }, [])

  const deleteFromMyLivers = (channelID: string) => {
    chrome.storage.local.get('customList', (data) => {
      const tempCustomList = data['customList'] as ChromeStorageData
      delete tempCustomList[channelID]
      void setChromeStorage('customList', tempCustomList)
      setCustomList(tempCustomList)
    })
  }

  const addToMyLivers = async (channelID: string) => {
    setFetchingVTuber(true)
    const config = {
      url: channelEndpoint + channelID,
      headers: apiHeaders,
    }

    try {
      const { data }: AxiosResponse<ChannelInformation> =
        await axios.request(config)
      const twitter = data.twitter
      const name = data.name
      chrome.storage.local.get('customList', (data) => {
        let tempCustomList = data['customList'] as ChromeStorageData
        tempCustomList = {
          ...tempCustomList,
          [channelID]: {
            name: member['channel'].english_name || name,
            imageURL: member['channel'].photo,
            channelID: member['channel'].id,
            twitter,
          },
        }
        void setChromeStorage('customList', tempCustomList)
        setCustomList(tempCustomList)
      })
      setFetchingVTuber(false)
    } catch (error) {
      setFetchingVTuber(false)
      console.error(error)
    }
  }

  const handleTwitter = (twitterID: string) => {
    const url = 'https://twitter.com/'
    void createTab(url + twitterID)
  }

  const url = `https://youtube.com/channel/${
    member['channelID'] || member['channel'].id
  }/live`
  const isLive = member.status === 'live'

  // TODO: put this into helpers, similar function in LiveStatus.tsx
  const timeUntilSchedule = (startTime: string) => {
    const difference = +new Date() - +new Date(startTime)
    const diffDuration = duration(-difference).humanize(false)
    if (diffDuration === 'Invalid date') return 'starting soon'
    return `IN: ${diffDuration}`
  }

  return (
    <InView>
      {showLiveStatus && isLive && <LiveStatus member={member} />}
      <div
        className='relative'
        onMouseEnter={() => {
          setShowLiveStatus(true)
          if (isLive) setProperty('showNavbar', false)
        }}
        onMouseLeave={() => {
          setShowLiveStatus(false)
          setProperty('showNavbar', true)
        }}
      >
        <img
          src={member.imageURL || member.channel.photo}
          alt={member.name}
          className={cn(
            'h-20 w-20 cursor-pointer rounded-full border-4 border-white bg-slate-200 object-cover shadow-md hover:opacity-80 dark:border-slate-700 dark:bg-slate-800',
            isLive && 'border-red-500 dark:border-red-500',
            !isLive &&
              member.scheduled &&
              'border-blue-500 dark:border-blue-500',
          )}
          onClick={() => void createTab(url)}
        />
        {!loading && member['twitter'] && (
          <div
            className={cn(
              'absolute bottom-[6em] left-[3em] cursor-pointer',
              isLive
                ? 'text-white hover:text-red-200'
                : 'text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
            )}
            onClick={() => handleTwitter(member['twitter'])}
          >
            <Twitter
              width={16}
              height={16}
              className='absolute bottom-[-0.8em] left-[1.20em] z-10 text-lg hover:opacity-60'
              fill={isLive || member.scheduled ? '#ffffff' : '#60a5fa'}
            />
            <span
              className={cn(
                'absolute bottom-[-0.82em] left-[0.975em] h-5 w-5 rounded-full bg-white text-xl dark:bg-slate-700',
                isLive && 'bg-red-500 dark:bg-red-500',
                !isLive && member.scheduled && 'bg-blue-500 dark:bg-blue-500',
              )}
            />
          </div>
        )}
        {path === 'all' && !fetchingVTuber && (
          <div className='absolute bottom-[4.8em] left-[4.8em] rounded-full text-red-500'>
            {Object.keys(customList).includes(member['channel'].id) ? (
              <BookmarkSlashIcon
                onClick={() => deleteFromMyLivers(member['channel'].id)}
                className='h-5 w-5 cursor-pointer  rounded-full border-2 border-red-500 bg-white p-0.5 hover:text-red-300'
              />
            ) : (
              <BookmarkIcon
                onClick={() => void addToMyLivers(member['channel'].id)}
                className='h-5 w-5 cursor-pointer rounded-full border-2 border-red-500 bg-white p-0.5 text-slate-700 hover:text-neutral-500'
              />
            )}
          </div>
        )}
        {fetchingVTuber && (
          <span className='absolute bottom-[4.6em] left-[4.7em] rounded-full bg-red-500 p-1 pb-0'>
            <ClipLoader
              size={15}
              color={theme === 'light' ? '#020617' : '#ffffff'}
            />
          </span>
        )}
        {loading && (
          <>
            <div className='absolute bottom-[4.5em] left-[4.5em] rounded-full bg-white p-1 pb-0 dark:bg-slate-700'>
              <ClipLoader
                size={15}
                color={theme === 'light' ? '#020617' : '#ffffff'}
              />
            </div>
            <div className='absolute bottom-[-5px] left-1/2 -translate-x-1/2'>
              <div className='rounded-full bg-white px-1.5 py-0.5  dark:bg-slate-700 dark:text-white'>
                <p className='text-[10px]'>OFFLINE</p>
              </div>
            </div>
          </>
        )}
        {!loading && (
          <div className='absolute bottom-[-5px] left-1/2 -translate-x-1/2'>
            {isLive && (
              <div className='relative'>
                <div className='absolute bottom-0 left-1/2 z-50 -translate-x-1/2 rounded-full bg-red-500 px-1.5 py-0.5 text-slate-100 dark:text-white'>
                  <p className='text-[10px]'>LIVE</p>
                </div>
                <div className='absolute bottom-[-1.25px] left-[-1.25em] h-5 w-8 animate-ping rounded-full bg-red-500/60'></div>
              </div>
            )}
            {!isLive && (
              <p
                className={cn(
                  'whitespace-nowrap rounded-full bg-white px-1.5 py-0.5 text-[10px] capitalize dark:bg-slate-700 dark:text-white',
                  member.scheduled &&
                    'bg-blue-500 text-white dark:bg-blue-500 ',
                )}
              >
                {member.scheduled
                  ? timeUntilSchedule(member.scheduled)
                  : 'OFFLINE'}
              </p>
            )}
          </div>
        )}
      </div>
    </InView>
  )
}

export default Liver
