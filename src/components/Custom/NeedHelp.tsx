import { LifebuoyIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'

import { createTab } from '@/helpers/chrome-api.ts'

interface NeedHelpProps {
  show: boolean
  setShowHelp: Dispatch<SetStateAction<boolean>>
}
const NeedHelp: React.FC<NeedHelpProps> = ({ show, setShowHelp }) => {
  if (!show) {
    return (
      <div
        onClick={() => setShowHelp((current) => !current)}
        className='flex cursor-pointer items-center gap-1 px-1 py-0.5 animate-in slide-in-from-top hover:opacity-60'
      >
        <LifebuoyIcon className='h-4 w-4' />
        <span>Need help?</span>
      </div>
    )
  }

  return (
    <div className='rounded-lg border border-slate-300 bg-slate-200 px-3 py-2 shadow-sm dark:border-slate-600 dark:bg-slate-700'>
      <p>Channel ID needs to be in this format:</p>
      <div className='flex items-center'>
        <p className='text-[10px]'>youtube.com/channel/ </p>
        <span className='bg-slate-300 text-[14px] font-bold dark:bg-slate-600 '>
          UC4WvIIAo89_AzGUh1AZ6Dkg
        </span>
      </div>
      <p>If VTuber is using @username format</p>
      <a
        onClick={() =>
          void createTab('https://commentpicker.com/youtube-channel-id.php')
        }
        className='cursor-pointer text-blue-500 hover:opacity-60'
      >
        You can find their ID here
      </a>
    </div>
  )
}

export default NeedHelp
