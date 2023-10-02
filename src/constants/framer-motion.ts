import { Variants } from 'framer-motion'

export const LiverVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.5,
    },
  },
}
