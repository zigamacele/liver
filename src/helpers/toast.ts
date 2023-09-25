export const successToast = (name: string) => {
  return {
    description: `${name} added to your list.`,
  }
}

export const errorToast = {
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
}
