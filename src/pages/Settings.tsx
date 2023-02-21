import React, { useEffect } from 'react';
import SelectLiver from '../Components/SelectLiver';

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';

function handleReset() {
  chrome.storage.local.remove('myLivers');
  window.location.reload();
}

export default function Settings() {
  useEffect(() => {
    chrome.storage.local.set({ goToSettings: false });
  }, []);

  return (
    <div>
      <div className="flex items-end justify-end">
        <div className="bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2 hover:text-rose-500">
          <ArchiveBoxXMarkIcon
            onClick={handleReset}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
      <SelectLiver />
    </div>
  );
}

//TODO github icon
//TODO hover icon color
