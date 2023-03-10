import DisplayMyLivers from '@/Components/DisplayMyLivers';
import React, { useEffect } from 'react';

export default function Home({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: any;
}) {
  useEffect(() => {
    chrome.storage.local.set({ goToSettings: true });
  }, []);

  return (
    <div>
      <DisplayMyLivers
        showStreamTitle={showStreamTitle}
        setShowStreamTitle={setShowStreamTitle}
      />
    </div>
  );
}
