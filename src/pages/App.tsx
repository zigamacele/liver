import { useNavigate } from 'react-router-dom'

const App: React.FC = () => {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/test')}>test</button>
}

export default App
