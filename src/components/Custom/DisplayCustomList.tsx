import { XCircleIcon } from '@heroicons/react/24/solid'

import { setChromeStorage } from '@/helpers/chrome-api.ts'

import { CustomList } from '@/types/database.ts'

interface DisplayCustomListProps {
  customList: CustomList
}

const DisplayCustomList: React.FC<DisplayCustomListProps> = ({
  customList,
}) => {
  const removeFromCustomList = (id: string) => {
    const tempCustomList = { ...customList }
    delete tempCustomList[id]
    void setChromeStorage('customList', tempCustomList)
  }

  return (
    <section className='mt-2 flex flex-col gap-1.5'>
      {Object.values(customList).flatMap((element) => {
        return (
          <div className='flex items-center justify-between gap-2 rounded-full border border-slate-300 bg-slate-300/30 px-1 py-1 shadow-sm fade-in dark:border-slate-700 dark:bg-slate-700/50'>
            <img
              src={element.imageURL}
              className='h-10 w-10 rounded-full border-2 border-white dark:border-slate-500'
              alt={element.name}
            />
            <div className='flex flex-col'>
              <span className=''>{element.name}</span>
              <span className='text-[10px] font-light opacity-60'>
                @{element.twitter}
              </span>
            </div>
            <XCircleIcon
              onClick={() => removeFromCustomList(element.channelID)}
              className='mr-2 h-6 w-6 cursor-pointer hover:text-rose-500'
            />
          </div>
        )
      })}
    </section>
  )
}

export default DisplayCustomList
