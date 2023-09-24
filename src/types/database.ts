export type Member = {
  name: string
  imageURL: string
  channelID: string
  retired: boolean
  twitter: string
}

export interface BranchInfo {
  branchID: string
  debut: string
  members: Member[]
}

export interface VTDatabase {
  [key: string]: BranchInfo[]
}
