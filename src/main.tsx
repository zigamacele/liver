import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router } from 'react-router'

import './styles/globals.css'

import { ThemeProvider } from '@/lib/shadcn/theme-provider.tsx'

import Navbar from '@/layouts/Navbar.tsx'
import Routes from '@/routes/AppRoutes.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='appearance'>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ThemeProvider>
  </StrictMode>,
)
