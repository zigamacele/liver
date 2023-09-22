const getConfig = (envKey: string) => {
  const envValue = import.meta.env[envKey] as string | undefined
  if (envValue === undefined) {
    console.error(`Config key ${envKey} is undefined.`)
    throw new Error('Bad config.')
  }

  return envValue
}

const config = {
  API: {
    KEY: getConfig('VITE_HOLODEX_KEY'),
  },
}

export default config
