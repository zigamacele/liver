import { crx, ManifestV3Export } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifestJson from './manifest.json'

const manifest = manifestJson as ManifestV3Export

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), crx({ manifest })],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
