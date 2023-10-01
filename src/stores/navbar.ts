import { create } from 'zustand'

import { NavbarStore, NavbarStoreState } from '@/types/zustand'

const useNavbarStore = create<NavbarStore>()((set) => ({
  showNavbar: true,
  nameDisplay: '',
  setProperty: <T extends keyof NavbarStoreState>(
    key: T,
    payload: NavbarStoreState[T],
  ) => set(() => ({ [key]: payload })),
}))

export default useNavbarStore
