import database from '@/lib/database.json'
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

type Member = {
  name: string
  imageURL: string
  channelID: string
  retired: boolean
  twitter: string
}

interface BranchInfo {
  branchID: string
  debut: string
  members: Member[]
}

interface VTuberDatabase {
  [key: string]: BranchInfo[]
}

const VTuberDatabase: VTuberDatabase = database
