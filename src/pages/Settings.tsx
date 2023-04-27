import Tooltip from '@/Components/Navigation/Tooltip';
import Footer from '@/Components/Settings/Footer';
import Selectors from '@/Components/Settings/Selectors';
import React, { useEffect, useState } from 'react';
import SelectLiver from '../Components/SelectLiver';

import { TrashIcon } from '@heroicons/react/24/solid';

function handleReset() {
  chrome.storage.local.remove('myLivers');
  window.location.reload();
}

export default function Settings({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
  const [settingsQuery, setSettingsQuery] = useState('NIJISANJI_EN');

  useEffect(() => {
    chrome.storage.local.set({ goToSettings: false });
  }, []);

  return (
    <div className="mb-12">
      <Footer />
      <div className="flex justify-between items-center">
        <Selectors setSettingsQuery={setSettingsQuery} />
        <Tooltip title="Remove All">
          <div
            onClick={handleReset}
            className="h-[30px] w-[30px] shadow-sm flex justify-center items-center cursor-pointer hover:text-rose-500 bg-white dark:bg-slate-700 rounded py-0.5 px-1"
          >
            <TrashIcon className="h-5 w-5" />
          </div>
        </Tooltip>
      </div>
      <SelectLiver
        settingsQuery={settingsQuery}
        showStreamTitle={showStreamTitle}
        setShowStreamTitle={setShowStreamTitle}
      />
    </div>
  );
}
