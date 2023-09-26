import { PlusCircleIcon } from '@heroicons/react/20/solid'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import { toast } from '@/lib/shadcn/ui/use-toast.ts'
import { cn } from '@/lib/shadcn/utils.ts'

import DisplayCustomList from '@/components/Custom/DisplayCustomList.tsx'
import NeedHelp from '@/components/Custom/NeedHelp.tsx'

import { apiHeaders, channelEndpoint } from '@/constants/api.ts'
import { setChromeStorage } from '@/helpers/chrome-api.ts'
import {
  customErrorMessage,
  errorToast,
  successToast,
} from '@/helpers/toast.ts'

import { ChannelInformation } from '@/types/api.ts'
import { CustomList } from '@/types/database.ts'

const Custom: React.FC = () => {
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [customList, setCustomList] = useState<CustomList>({})
  const [showHelp, setShowHelp] = useState(false)

  const saveToChromeStorage = (APIData: ChannelInformation) => {
    let customLivers: CustomList = {}

    chrome.storage.local.get('customList', (data) => {
      if (
        data['customList'] === undefined ||
        !Object.keys(data['customList'] as CustomList).length
      ) {
        void setChromeStorage('customList', {
          [userInput]: {
            name: APIData.english_name || APIData.name,
            channelID: APIData.id,
            imageURL: APIData.photo,
            twitter: APIData.twitter,
          },
        })
        setCustomList({
          [userInput]: {
            name: APIData.english_name || APIData.name,
            channelID: APIData.id,
            imageURL: APIData.photo,
            twitter: APIData.twitter,
          },
        })
        return
      }

      customLivers = data['customList'] as CustomList
      if (Object.keys(customLivers).includes(userInput)) {
        delete customLivers[userInput as keyof CustomList]
        customLivers = {
          ...customLivers,
          [userInput]: {
            name: APIData.english_name ?? APIData.name,
            channelID: APIData.id,
            imageURL: APIData.photo,
            twitter: APIData.twitter,
          },
        }
        void setChromeStorage('customList', customLivers)
        setCustomList(customLivers)
      } else {
        customLivers = {
          ...customLivers,
          [userInput]: {
            name: APIData.english_name ?? APIData.name,
            channelID: APIData.id,
            imageURL: APIData.photo,
            twitter: APIData.twitter,
          },
        }
        void setChromeStorage('customList', customLivers)
        setCustomList(customLivers)
        setUserInput('')
      }
    })
  }

  const getChannelInformation = async () => {
    const config = {
      url: channelEndpoint + userInput,
      headers: apiHeaders,
    }

    try {
      setLoading(true)
      const { data }: AxiosResponse<ChannelInformation> =
        await axios.request(config)

      saveToChromeStorage(data)
      // console.log(data)
      toast(successToast(data.english_name ?? data.name))
      setLoading(false)
    } catch (error) {
      toast(errorToast)
      setLoading(false)
      console.error(error)
    }
  }

  const handleInputSubmit = () => {
    if (userInput.length > 3 && !loading) {
      return void getChannelInformation()
    }
    toast(customErrorMessage('Channel ID is too short'))
  }

  useEffect(() => {
    chrome.storage.local.get('customList', (data) => {
      if (data['customList']) {
        setCustomList(data['customList'] as CustomList)
      }
    })
    chrome.storage.onChanged.addListener((changes) => {
      if ('customList' in changes) {
        setCustomList(changes['customList'].newValue as CustomList)
      }
    })
  }, [])

  return (
    <section className='flex min-h-[6em] flex-col gap-1 px-4 pt-14 '>
      <div className='relative'>
        <input
          value={userInput}
          className='h-10 w-full rounded-lg border border-slate-300 bg-slate-200 px-4 py-1 pr-6 outline-none placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-slate-400'
          placeholder="VTuber's Channel ID"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <PlusCircleIcon
          onClick={handleInputSubmit}
          className={cn(
            'absolute right-2 top-1/2 z-50 h-6 w-6 -translate-y-1/2 cursor-pointer hover:opacity-70',
            loading && 'animate-pulse',
          )}
        />
      </div>
      <NeedHelp show={showHelp} setShowHelp={setShowHelp} />
      {!!Object.keys(customList).length && (
        <DisplayCustomList customList={customList} />
      )}
    </section>
  )
}

export default Custom
