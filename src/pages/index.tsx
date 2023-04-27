import { Router } from 'react-chrome-extension-router';
import Home from './Home';

export default function Index() {
  return (
    <Router>
      <Home />
    </Router>
  );
}
