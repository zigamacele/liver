import { useState } from 'react'

import Selectors from '@/components/Settings/Selectors.tsx'
import VTuberSelector from '@/components/Settings/VTuberSelector.tsx'

import Footer from '@/layouts/Footer.tsx'

const Settings: React.FC = () => {
  const [selector, setSelector] = useState('NIJISANJI_EN')
  return (
    <div className='px-2 pb-12 pt-14'>
      <Selectors setSelector={setSelector} />
      <VTuberSelector selected={selector} />
      <Footer />
    </div>
  )
}

export default Settings
