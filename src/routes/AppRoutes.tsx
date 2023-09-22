import { Route, Routes } from 'react-router-dom'

import App from '@/pages/Home.tsx'
import Settings from '@/pages/Settings.tsx'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  )
}

export default AppRoutes
