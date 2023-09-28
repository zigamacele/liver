import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/20/solid'
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import { cn } from '@/lib/shadcn/utils.ts'

import { apiHeaders, channelEndpoint } from '@/constants/api.ts'
import { createTab, setChromeStorage } from '@/helpers/chrome-api.ts'
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

  console.error(showLiveStatus, customList, setFetchingVTuber)

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
            twitter: twitter,
            status: member['status'],
            title: member['title'],
            started: member['start_actual'],
            org: member['channel'].org,
            viewers: member['live_viewers'],
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

  return (
    <section className='fade-in '>
      {showLiveStatus && isLive && <LiveStatus member={member} />}
      <div
        className='relative'
        onMouseEnter={() => {
          setShowLiveStatus(true)
        }}
        onMouseLeave={() => {
          setShowLiveStatus(false)
        }}
      >
        <img
          src={member.imageURL || member.channel.photo}
          alt={member.name}
          className={cn(
            'h-20 w-20 cursor-pointer rounded-full border-4 object-cover shadow-md hover:opacity-80',
            isLive
              ? 'border-red-500'
              : 'border-white bg-slate-200 dark:border-slate-700 dark:bg-slate-800',
          )}
          onClick={() => void createTab(url)}
        />
        {!loading && member['twitter'] && (
          <div
            className={cn(
              'absolute bottom-[6em] left-[3em] cursor-pointer fade-in',
              isLive
                ? 'text-white hover:text-red-200'
                : 'text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
            )}
            onClick={() => handleTwitter(member['twitter'])}
          >
            <TwitterLogoIcon className='absolute bottom-[-0.8em] left-[1.20em] z-10 text-lg ' />
            <span
              className={`absolute bottom-[-0.82em] left-[0.975em] text-xl ${
                isLive ? 'bg-red-500' : 'bg-white dark:bg-slate-700'
              } h-5 w-5 rounded-full`}
            />
          </div>
        )}
        {path === 'all' && !fetchingVTuber && (
          <div className='absolute bottom-[4.8em] left-[4.8em] rounded-full text-red-500 fade-in'>
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
          <div className='absolute bottom-[4.6em] left-[4.7em] rounded-full bg-red-500 p-1 pb-0 fade-in'>
            <ClipLoader size={15} color='white' />
          </div>
        )}
        {loading && (
          <>
            <div className='absolute bottom-[4.5em] left-[4.5em] rounded-full bg-white p-1 pb-0 fade-in dark:bg-slate-700'>
              <ClipLoader size={15} />
            </div>
            <div className='absolute bottom-[-5px] left-1/2 -translate-x-1/2 transform'>
              <div className='rounded-full bg-white px-1.5 py-0.5  dark:bg-slate-700 dark:text-white'>
                <p className='text-[10px] fade-in'>OFFLINE</p>
              </div>
            </div>
          </>
        )}
        {!loading && (
          <div className='absolute bottom-[-5px] left-1/2 -translate-x-1/2 transform'>
            {isLive && (
              <div className='relative'>
                <div className='absolute bottom-0 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-red-500 px-1.5 py-0.5 text-slate-100 dark:text-white'>
                  <p className='text-[10px] fade-in'>LIVE</p>
                </div>
                <div className='absolute bottom-[-1.25px] left-[-1.25em] h-5 w-8 animate-ping rounded-full bg-red-500/60'></div>
              </div>
            )}
            {!isLive && (
              <div className='rounded-full bg-white px-1.5 py-0.5  dark:bg-slate-700 dark:text-white'>
                <p className='text-[10px] fade-in'>OFFLINE</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Liver
