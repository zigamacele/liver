import { RefreshCw, Settings, Sun, UserPlus, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import NavButton from '@/components/Navbar/NavButton.tsx'

import { HOME, SETTINGS } from '@/constants/paths.ts'
const Navbar = () => {
  return (
    <nav className='fixed z-50 flex w-96 items-center justify-between bg-slate-100/80 px-3 py-2 backdrop-blur-md dark:bg-slate-800/80'>
      <Link to={HOME}>
        <p className='cursor-pointer text-xl font-medium hover:opacity-60'>
          Liver
        </p>
      </Link>
      <div className='flex items-center gap-2 text-slate-700 dark:text-blue-500'>
        <div className='rounded bg-slate-200 px-2 py-1.5 shadow-sm dark:bg-slate-700'>
          <NavButton Icon={<RefreshCw size={20} />} linkTo={HOME} />
        </div>
        <div className='flex items-center gap-2 rounded bg-slate-200 px-2 py-1.5 shadow-sm dark:bg-slate-700'>
          <NavButton Icon={<UserPlus size={20} />} />
          <NavButton Icon={<Users size={20} />} />
        </div>
        <div className='flex items-center gap-2 rounded bg-slate-200 px-2 py-1.5 shadow-sm dark:bg-slate-700'>
          <NavButton Icon={<Sun size={20} />} />
          <NavButton Icon={<Settings size={20} />} linkTo={SETTINGS} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
