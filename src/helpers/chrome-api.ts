import { MyLivers } from '@/types/chrome-api.ts'
import { CustomList } from '@/types/database.ts'

export const setChromeStorage = async (
  key: string,
  value: MyLivers | CustomList,
) => {
  await chrome.storage.local.set({ [key]: value })
}

export const resetMyLivers = async () => {
  await chrome.storage.local.remove('myLivers')
  window.location.reload()
}

export const createTab = async (url: string) => {
  await chrome.tabs.create({
    url,
  })
}
