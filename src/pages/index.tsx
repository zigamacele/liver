import { useEffect, useState } from 'react';
import { Router } from 'react-chrome-extension-router';
import Home from './Home';
import Settings from './Settings';

export default function Index({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    checkForLivers();
  }, []);

  function checkForLivers() {
    chrome.storage.local.get('myLivers', function (data) {
      if (data.myLivers === undefined || data.myLivers.length === 0)
        setShowSettings(true);
    });
  }

  return (
    <Router>
      {showSettings ? (
        <Settings
          showStreamTitle={showStreamTitle}
          setShowStreamTitle={setShowStreamTitle}
        />
      ) : (
        <Home
          showStreamTitle={showStreamTitle}
          setShowStreamTitle={setShowStreamTitle}
        />
      )}
    </Router>
  );
}
