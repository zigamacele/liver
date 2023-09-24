import { MyLivers } from '@/types/chrome-storage.ts'

export const setChromeStorage = async (key: string, value: MyLivers) => {
  await chrome.storage.local.set({ [key]: value })
}
