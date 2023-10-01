import { motion } from 'framer-motion'
import { ReactNode } from 'react'

import { LiverVariants } from '@/constants/framer-motion.ts'

interface InViewProps {
  children: ReactNode
  className?: string
}

const InView: React.FC<InViewProps> = ({ children, className }) => {
  return (
    <motion.div
      variants={LiverVariants}
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
export default InView
