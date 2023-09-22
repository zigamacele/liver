type ChannelInformation = {
  english_name: string
  id: string
  name: string
  photo: string
  type: string
}

export type LiveChannel = {
  available_at: string
  channel: ChannelInformation
  duration: number
  id: string
  live_viewers: number
  published_at: string
  start_actual: string
  start_scheduled: string
  status: string
  title: string
  topic_id: string
  type: string
}

export interface LiveChannels {
  data: LiveChannel[]
  isLoading: boolean
  reExecute: () => Promise<void>
}
