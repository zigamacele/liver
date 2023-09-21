import { Route, Routes } from 'react-router-dom'

import App from '@/pages/App.tsx'
import Test from '@/pages/Test.tsx'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='test' element={<Test />} />
    </Routes>
  )
}

export default AppRoutes
