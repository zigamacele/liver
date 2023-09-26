import { Member } from '@/types/database.ts'

export interface MyLivers {
  [key: string]: Member
}

type VTuberFromStorage = {
  name: string
  imageURL: string
  channelID: string
  retired: boolean
  twitter: string
  status?: string
  title?: string
  started?: string
  fullName?: string
  org?: string
  viewers?: number
  scheduled?: number
}

export interface ChromeStorageData {
  [key: string]: VTuberFromStorage
}
