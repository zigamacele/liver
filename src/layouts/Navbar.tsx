import { ArrowPathIcon } from '@heroicons/react/24/outline'
import {
  Cog6ToothIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import { AppearanceToggle } from '@/lib/shadcn/ui/appearance-toggle.tsx'

import NavButton from '@/components/Navbar/NavButton.tsx'

import { ALL, CUSTOM, HOME, SETTINGS } from '@/constants/paths.ts'
const Navbar = () => {
  return (
    <nav className='fixed z-50 flex w-full items-center justify-between bg-slate-100/80 px-3 py-2 backdrop-blur-md dark:bg-slate-800/80'>
      <Link
        to={HOME}
        className='cursor-pointer text-xl font-medium hover:opacity-60'
      >
        Liver
      </Link>
      <section className='flex items-center gap-2 text-slate-700 dark:text-blue-500'>
        <div className='flex items-center rounded bg-slate-200 px-2 py-1.5 dark:bg-slate-700'>
          <NavButton
            Icon={<ArrowPathIcon />}
            tooltipText='Refresh'
            onClick={() => window.location.reload()}
          />
        </div>
        <div className='flex items-center gap-2 rounded bg-slate-200 px-2 py-1.5 dark:bg-slate-700'>
          <NavButton
            Icon={<UserPlusIcon />}
            linkTo={CUSTOM}
            tooltipText='Add New VTuber'
          />
          <NavButton
            Icon={<UserGroupIcon />}
            linkTo={ALL}
            tooltipText='All Live VTubers'
          />
        </div>
        <div className='relative flex items-center gap-2 rounded bg-slate-200 px-2 py-1.5 dark:bg-slate-700'>
          <AppearanceToggle />
          <NavButton
            Icon={<Cog6ToothIcon />}
            linkTo={SETTINGS}
            tooltipText='Settings'
          />
        </div>
      </section>
    </nav>
  )
}

export default Navbar
