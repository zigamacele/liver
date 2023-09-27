type ChannelInfo = {
  english_name: string
  id: string
  name: string
  photo: string
  type: string
  org: string
}

export type LiveChannel = {
  available_at: string
  channel: ChannelInfo
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

export interface ChannelInformation {
  banner: string
  clip_count: number | null
  comments_crawled_at: Date | null
  crawled_at: string
  created_at: string
  description: string
  english_name: string | undefined
  id: string
  inactive: boolean
  lang: string
  name: string
  org: string | null
  photo: string
  published_at: string
  suborg: string | null
  subscriber_count: string
  thumbnail: string
  twitter: string
  type: string
  updated_at: string
  video_count: string
  view_count: string
  yt_uploads_id: string
}
