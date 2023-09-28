import { TrashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

import Selectors from '@/components/Settings/Selectors.tsx'
import VTuberSelector from '@/components/Settings/VTuberSelector.tsx'

import { ButtonSize, ButtonVariants } from '@/enums/shadcn.ts'
import { resetMyLivers } from '@/helpers/chrome-api.ts'
import Button from '@/layouts/Button.tsx'
import Footer from '@/layouts/Footer.tsx'

const Settings: React.FC = () => {
  const [selector, setSelector] = useState('NIJISANJI_EN')
  return (
    <section className='px-2 py-14'>
      <span className='flex items-center justify-between'>
        <Selectors setSelector={setSelector} />
        <Button
          tooltipText='Remove All'
          variant={ButtonVariants.outline}
          size={ButtonSize.icon}
          onClick={resetMyLivers}
        >
          <TrashIcon className='h-5 w-5' />
        </Button>
      </span>
      <VTuberSelector selected={selector} />
      <Footer />
    </section>
  )
}

export default Settings
