import { ReactNode } from 'react'

import {
  Tooltip as ToolTip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/shadcn/ui/tooltip'

interface TooltipProps {
  children: ReactNode
  triggerProps?: string
  text: string
}
const Tooltip: React.FC<TooltipProps> = ({ children, triggerProps, text }) => {
  return (
    <TooltipProvider>
      <ToolTip>
        <TooltipTrigger className={triggerProps}>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </ToolTip>
    </TooltipProvider>
  )
}
export default Tooltip
