import React, { useEffect } from 'react';
import SelectLiver from '../Components/SelectLiver';

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';
import { BsGithub } from 'react-icons/bs';

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
      <div className="flex items-end justify-between">
        <p className="text-lg font-light">NIJISANJI EN</p>
        <div className="flex gap-2 bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          <ArchiveBoxXMarkIcon
            onClick={handleReset}
            className="h-5 w-5 cursor-pointer hover:text-rose-500"
          />
          <BsGithub
            className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500"
            onClick={() =>
              chrome.tabs.create({
                url: 'https://github.com/zigamacele/liver',
              })
            }
          />
        </div>
      </div>
      <SelectLiver />
    </div>
  );
}
