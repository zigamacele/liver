import React, { useEffect, useState } from 'react';
import SelectLiver from '../Components/SelectLiver';

import { Switch } from '@headlessui/react';

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';
import { BsGithub } from 'react-icons/bs';

function handleReset() {
  chrome.storage.local.remove('myLivers');
  window.location.reload();
}

export default function Settings() {
  const [enabled, setEnabled] = useState(false);
  const [corpo, setCorpo] = useState('NIJISANJI');
  const [language, setLanguage] = useState('EN');
  const [settingsQuery, setSettingsQuery] = useState('NIJISANJI_EN');

  useEffect(() => {
    chrome.storage.local.set({ goToSettings: false });
  }, []);

  useEffect(() => {
    // setSettingsQuery('NIJISANJI_EN');
  }, [language, enabled]);

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <p className="text-lg font-light"> EN</p>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled
                  ? 'dark:bg-blue-500 bg-slate-700'
                  : 'bg-gray-200 dark:bg-slate-700'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <p className="text-lg font-light"> JP</p>
          </div>
          <div className="flex gap-2 font-light">
            <span>NIJISANJI</span>
            <span>HOLOLIVE</span>
          </div>
        </div>

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
      <SelectLiver settingsQuery={settingsQuery} />
    </div>
  );
}
