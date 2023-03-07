import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-chrome-extension-router';

import {
  ArrowPathIcon,
  Cog6ToothIcon as Cog6ToothIconOutline,
  SunIcon as SunIconOutline,
} from '@heroicons/react/24/outline';
import { Cog6ToothIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Navigation() {
  const [darkMode, setDarkMode] = useState(false);
  const [gotoSettings, setGoToSettings] = useState(false);

  useEffect(() => {
    fetchChromeStorage();
    chrome.storage.onChanged.addListener(function (changes) {
      if ('goToSettings' in changes) {
        setGoToSettings(changes.goToSettings.newValue);
      }
      if ('darkMode' in changes) {
        setDarkMode(changes.darkMode.newValue);
        if (changes.darkMode.newValue === true)
          document.documentElement.classList.add('dark');

        if (changes.darkMode.newValue === false)
          document.documentElement.classList.remove('dark');
      }
    });
  }, []);

  function fetchChromeStorage() {
    chrome.storage.local.get('darkMode', function (data) {
      if (data.darkMode === undefined) {
        return;
      }
      if (data.darkMode === true)
        document.documentElement.classList.add('dark');

      if (data.darkMode === false)
        document.documentElement.classList.remove('dark');
      setDarkMode(data.darkMode);
    });
    chrome.storage.local.get('goToSettings', function (data) {
      if (data.goToSettings === undefined) {
        return;
      }
      setGoToSettings(data.goToSettings);
    });
  }

  function handleDarkMode() {
    chrome.storage.local.set({ darkMode: !darkMode });
  }
  function handleReload() {
    window.location.reload();
  }

  return (
    <div className="flex justify-between items-center">
      <div className="text-xl font-medium">Liver</div>
      <div className="flex items-center gap-2 dark:text-blue-500 text-slate-700">
        <div className="bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          <ArrowPathIcon
            className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500 hover:animate-spin"
            onClick={handleReload}
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          {darkMode ? (
            <SunIconOutline
              onClick={handleDarkMode}
              className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500"
            />
          ) : (
            <SunIcon
              onClick={handleDarkMode}
              className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500"
            />
          )}
          {gotoSettings ? (
            <Link component={Settings}>
              <Cog6ToothIconOutline className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500" />
            </Link>
          ) : (
            <Link component={Home}>
              <Cog6ToothIcon className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
