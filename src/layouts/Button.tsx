import { ReactNode } from 'react'

import { Button } from '@/lib/shadcn/ui/button.tsx'

import { ButtonSize, ButtonVariants } from '@/enums/shadcn.ts'
import Tooltip from '@/layouts/Tooltip.tsx'

interface ButtonProps {
  tooltipText: string
  variant: keyof typeof ButtonVariants | null | undefined
  size: keyof typeof ButtonSize | null | undefined
  children: ReactNode
  onClick?: () => void | Promise<void>
}

const ButtonComponent: React.FC<ButtonProps> = ({
  tooltipText,
  variant,
  size,
  children,
  onClick,
}) => {
  return (
    <Tooltip text={tooltipText}>
      <Button variant={variant} size={size} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  )
}

export default ButtonComponent
