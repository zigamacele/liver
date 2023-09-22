import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface NavBarProps {
  Icon: ReactNode
  linkTo?: string
}
const NavButton: React.FC<NavBarProps> = ({ Icon, linkTo }) => {
  return (
    <Link to={linkTo ?? '#'}>
      <div className='cursor-pointer hover:text-slate-500 hover:dark:text-blue-400'>
        {Icon}
      </div>
    </Link>
  )
}

export default NavButton
