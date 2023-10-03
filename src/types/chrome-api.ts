import { Member } from '@/types/database.ts'

export interface MyLivers {
  [key: string]: Member
}

export type VTuberFromStorage = {
  name: string
  imageURL: string
  channelID: string
  retired?: boolean
  twitter: string
  status?: string
  title?: string
  started?: string
  fullName?: string
  org?: string
  viewers?: number
  scheduled?: string
}

export interface ChromeStorageData {
  [key: string]: VTuberFromStorage
}
