import { Route, Routes } from 'react-router-dom'

import DisplayMyLivers from '@/components/Home/DisplayMyLivers.tsx'

import All from '@/pages/All.tsx'
import Custom from '@/pages/Custom.tsx'
import Settings from '@/pages/Settings.tsx'

import { ALL, CUSTOM, HOME, SETTINGS } from '@/constants/paths.ts'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME} element={<DisplayMyLivers />} />
      <Route path={SETTINGS} element={<Settings />} />
      <Route path={CUSTOM} element={<Custom />} />
      <Route path={ALL} element={<All />} />
    </Routes>
  )
}

export default AppRoutes
