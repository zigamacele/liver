import useLiveChannels from '@/hooks/useLiveChannels.tsx'

import Liver from '@/layouts/Liver.tsx'

import { LiveChannel } from '@/types/api.ts'
import { VTuberFromStorage } from '@/types/chrome-api.ts'

const All = () => {
  const { data, isLoading } = useLiveChannels()

  if (isLoading) {
    return (
      <section className='flex flex-wrap justify-center gap-3 pt-14'>
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className='h-20 w-20 animate-pulse rounded-full bg-slate-300/60 dark:bg-slate-700/80'
          />
        ))}
      </section>
    )
  }

  return (
    <section className='mb-1 flex flex-wrap justify-center gap-3 pb-4 pt-14'>
      {data.map((VTuber) => {
        if (VTuber.status === 'live') {
          return (
            <Liver
              member={VTuber as LiveChannel & VTuberFromStorage}
              loading={isLoading}
              path='all'
              key={VTuber.id}
            />
          )
        }
        return
      })}
    </section>
  )
}

export default All
