import { Variants } from 'framer-motion'

export const LiverVariants: Variants = {
  offscreen: {
    y: 25,
  },
  onscreen: {
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.5,
    },
  },
}
