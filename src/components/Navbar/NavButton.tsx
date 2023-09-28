import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Tooltip from '@/layouts/Tooltip'

interface NavBarProps {
  Icon: ReactNode
  tooltipText: string
  linkTo?: string
  onClick?: () => void
}
const NavButton: React.FC<NavBarProps> = ({
  Icon,
  linkTo,
  tooltipText,
  onClick,
}) => {
  return (
    <Tooltip
      text={tooltipText}
      triggerProps='h-5 w-5 cursor-pointer hover:text-slate-500 hover:dark:text-blue-400'
    >
      <Link to={linkTo ?? '#'} onClick={onClick}>
        {Icon}
      </Link>
    </Tooltip>
  )
}

export default NavButton
