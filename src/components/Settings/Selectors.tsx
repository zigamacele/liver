import { useEffect, useState } from 'react'

import { corpos, regions } from '@/constants/database.ts'
import Select from '@/layouts/Select.tsx'

interface SelectorsProps {
  setSelector: (selector: string) => void
}
const Selectors: React.FC<SelectorsProps> = ({ setSelector }) => {
  const [selectedCorpo, setSelectedCorpo] = useState(corpos[0]?.value)
  const [selectedRegion, setSelectedRegion] = useState(regions[0]?.value)

  useEffect(() => {
    setSelector(`${selectedCorpo}_${selectedRegion}`)
  }, [selectedCorpo, selectedRegion])

  return (
    <section className='flex gap-2'>
      <Select
        data={corpos}
        disabled={selectedRegion === 'ID' && ['HOLOSTARS', 'NIJISANJI']}
        selected={selectedCorpo}
        setSelected={setSelectedCorpo}
      />
      <Select
        data={regions}
        disabled={selectedCorpo !== 'HOLOLIVE' && ['ID']}
        selected={selectedRegion}
        setSelected={setSelectedRegion}
      />
    </section>
  )
}

export default Selectors
