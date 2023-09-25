import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { useTheme } from '@/lib/shadcn/theme-provider.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/shadcn/ui/dropdown-menu'

export const AppearanceToggle = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className='cursor-pointer hover:text-slate-500 hover:dark:text-blue-400'>
          <SunIcon className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute left-[9px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
