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
  return (
    <Router>
      <Home
        showStreamTitle={showStreamTitle}
        setShowStreamTitle={setShowStreamTitle}
      />
    </Router>
  );
}
