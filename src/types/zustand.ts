export interface NavbarStoreState {
  showNavbar: boolean
  nameDisplay: string
}

export interface NavbarStore extends NavbarStoreState {
  setProperty: <T extends keyof NavbarStoreState>(
    key: T,
    payload: NavbarStoreState[T],
  ) => void
}
