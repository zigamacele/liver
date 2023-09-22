import config from '@/config/env.ts'

export const apiHeaders = {
  'X-APIKEY': config.API.KEY,
  'Content-Type': 'application/json',
}

export const channelEndpoint = 'https://holodex.net/api/v2/channels/'
export const liveEndpoint = 'https://holodex.net/api/v2/live'
