import DisplayMyLivers from '@/Components/DisplayMyLivers';
import React, { useEffect } from 'react';
import { Link } from 'react-chrome-extension-router';
import Settings from './Settings';

export default function Home() {
  useEffect(() => {
    chrome.storage.local.set({ goToSettings: true });
  }, []);

  return (
    <div>
      <DisplayMyLivers />
    </div>
  );
}
