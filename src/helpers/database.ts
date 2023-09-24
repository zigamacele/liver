import { VTuberDatabase } from '@/constants/database.ts'

import { BranchInfo, Member } from '@/types/database.ts'

export const flattenedVTuberDatabase = Object.values(VTuberDatabase).flatMap(
  (group) => group.flatMap((branch: BranchInfo) => branch.members),
)

export const databaseSearch = (memberID: string) => {
  for (const member of flattenedVTuberDatabase) {
    if (member.channelID === memberID) {
      return member
    }
  }
  return {} as Member
}
