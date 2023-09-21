import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router } from 'react-router'

import './styles/index.css'

import Routes from '@/routes/AppRoutes.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes />
    </Router>
  </StrictMode>,
)
