import { ClockIcon } from '@heroicons/react/24/outline'
import { duration } from 'moment/moment'
import Marquee from 'react-fast-marquee'

import { LiveChannel } from '@/types/api.ts'
import { VTuberFromStorage } from '@/types/chrome-api.ts'
interface LiveStatusProps {
  member: VTuberFromStorage & LiveChannel
}
const LiveStatus: React.FC<LiveStatusProps> = ({ member }) => {
  const startedStreaming = (startTime: string) => {
    const difference = +new Date() - +new Date(startTime)
    const diffDuration = duration(-difference).humanize(true)
    if (diffDuration === 'Invalid date') return 'starting soon'
    return diffDuration
  }

  return (
    <section className='fixed left-0 top-0 z-50 h-16 w-screen bg-slate-100/80 py-2 text-xs backdrop-blur-sm fade-in dark:bg-slate-800/80'>
      <div className='flex flex-col gap-0.5'>
        <div className='flex items-center justify-between px-3'>
          <div>
            <div className='flex flex-col'>
              <span className='text-[10px] font-light'>
                {member.org || member.channel.org}
              </span>
              <span>{member.name || member.channel.english_name}</span>
            </div>
          </div>
          <div className='flex flex-col items-end justify-end'>
            <div className='flex items-center gap-1.5'>
              <div className='h-2 w-2 rounded-full bg-red-500'>
                <div className=' h-2 w-2 animate-ping rounded-full bg-red-500'></div>
              </div>
              <span>{member.viewers || member.live_viewers || 0}</span>
            </div>
            <div className='flex items-center gap-1'>
              <ClockIcon className='h-4 w-4' />
              <span>
                {startedStreaming(member.started || member.start_actual)}
              </span>
            </div>
          </div>
        </div>
        <Marquee speed={45}>{member.title}</Marquee>
      </div>
    </section>
  )
}

export default LiveStatus
