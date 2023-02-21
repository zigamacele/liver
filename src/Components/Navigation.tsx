import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-chrome-extension-router';

import {
  Cog6ToothIcon as Cog6ToothIconOutline,
  SunIcon as SunIconOutline,
} from '@heroicons/react/24/outline';
import { Cog6ToothIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Navigation() {
  const [darkMode, setDarkMode] = useState(true);
  const [gotoSettings, setGoToSettings] = useState(false);

  useEffect(() => {
    fetchChromeStorage();

    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if ('goToSettings' in changes) {
        setGoToSettings(changes.goToSettings.newValue);
      }
    });
  }, []);

  function fetchChromeStorage() {
    chrome.storage.local.get('darkMode', function (data: any) {
      if (data.darkMode === undefined) {
        return;
      }
      setDarkMode(data.darkMode);
    });
    chrome.storage.local.get('goToSettings', function (data: any) {
      if (data.goToSettings === undefined) {
        return;
      }
      setGoToSettings(data.goToSettings);
    });
  }

  function handleGoToSettings() {
    chrome.storage.local.set({ goToSettings: !gotoSettings });
  }
  function handleDarkMode() {
    chrome.storage.local.set({ darkMode: !darkMode });
    setDarkMode(!darkMode);
  }

  return (
    <div className="flex justify-between items-center">
      <div className="text-xl">Liver</div>
      <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 rounded p-1.5 dark:text-blue-500 text-slate-700">
        {darkMode ? (
          <SunIconOutline onClick={handleDarkMode} className="h-5 w-5 " />
        ) : (
          <SunIcon onClick={handleDarkMode} className="h-5 w-5 " />
        )}
        {gotoSettings ? (
          <Link component={Settings}>
            <Cog6ToothIconOutline
              className="h-5 w-5 "
              onClick={handleGoToSettings}
            />
          </Link>
        ) : (
          <Link component={Home}>
            <Cog6ToothIcon className="h-5 w-5 " onClick={handleGoToSettings} />
          </Link>
        )}
      </div>
    </div>
  );
}
