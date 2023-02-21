import DisplayMyLivers from '@/Components/DisplayMyLivers';
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    chrome.storage.local.set({ goToSettings: true });

    aa();
  }, []);

  function aa() {}

  return (
    <div>
      <DisplayMyLivers />
    </div>
  );
}
