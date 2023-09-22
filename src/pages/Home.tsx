import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/settings')}>test</button>
}

export default Home
