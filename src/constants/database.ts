import database from '@/lib/database.json'

import { VTDatabase } from '@/types/database.ts'
export const corpos = [
  { value: 'NIJISANJI', label: 'Nijisanji' },
  { value: 'HOLOLIVE', label: 'Hololive' },
  { value: 'HOLOSTARS', label: 'Holostars' },
]
export const regions = [
  { value: 'EN', label: 'English' },
  { value: 'JP', label: 'Japan' },
  { value: 'ID', label: 'Indonesia' },
]

export const VTuberDatabase: VTDatabase = database
