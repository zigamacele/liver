import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

import { VTuberDatabase } from '@/constants/database.ts'
import { setChromeStorage } from '@/helpers/chrome-api.ts'
import { databaseSearch } from '@/helpers/database.ts'

import { MyLivers } from '@/types/chrome-api.ts'

interface VTuberSelectorProps {
  selected: string
}
const VTuberSelector: React.FC<VTuberSelectorProps> = ({ selected }) => {
  const [selectedLivers, setSelectedLivers] = useState({})

  useEffect(() => {
    chrome.storage.local.get('myLivers', function (data) {
      setSelectedLivers({ ...(data['myLivers'] as MyLivers) })
    })
  }, [])

  const saveToChromeStorage = (memberID: string) => {
    let liversArray: MyLivers = {}
    chrome.storage.local.get('myLivers', (data) => {
      if (
        data['myLivers'] === undefined ||
        Object.keys(data['myLivers'] as Record<string, any>).length === 0
      ) {
        void setChromeStorage('myLivers', {
          [memberID]: databaseSearch(memberID),
        })
        setSelectedLivers({ [memberID]: databaseSearch(memberID) })
        return
      }
      liversArray = data['myLivers'] as MyLivers
      if (Object.keys(liversArray).includes(memberID)) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete liversArray[memberID]

        void setChromeStorage('myLivers', liversArray)
        setSelectedLivers(liversArray)
      } else {
        liversArray = {
          ...liversArray,
          [memberID]: databaseSearch(memberID),
        }
        void setChromeStorage('myLivers', liversArray)
        setSelectedLivers(liversArray)
      }
    })
  }

  return (
    <section className='mt-2.5 flex flex-col gap-1'>
      {VTuberDatabase[selected]?.map((branch) => (
        <div key={branch.branchID}>
          <p className='mx-1 font-medium capitalize'>{branch.branchID}</p>
          <div className='flex flex-wrap gap-1.5'>
            {branch.members.map((member) => (
              <div
                key={member.name}
                onClick={() => saveToChromeStorage(member.channelID)}
                className='mt-1 fade-in'
              >
                {!Object.keys(selectedLivers).includes(member.channelID) ? (
                  <img
                    src={member.imageURL}
                    alt={member.name}
                    className='h-14 w-14 cursor-pointer rounded-full border-2 border-white bg-slate-200 shadow-sm hover:opacity-80 dark:border-slate-700 dark:bg-slate-800'
                  />
                ) : (
                  <div className='relative cursor-pointer'>
                    <CheckCircleIcon className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-slate-700 dark:text-slate-200 ' />
                    <img
                      src={member.imageURL}
                      alt={member.name}
                      className='h-14 w-14 rounded-full bg-slate-200 p-1 opacity-50 dark:bg-slate-700'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default VTuberSelector
