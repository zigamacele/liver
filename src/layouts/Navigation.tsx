import Tooltip from '@/Components/Navigation/Tooltip';
import Custom from '@/pages/Custom';
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import ViewAll from '@/pages/ViewAll';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-chrome-extension-router';

import {
  ArrowPathIcon,
  SunIcon as SunIconOutline,
} from '@heroicons/react/24/outline';

import {
  Cog6ToothIcon,
  SunIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';

export default function Navigation({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchChromeStorage();
    chrome.storage.onChanged.addListener(function (changes) {
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
  }

  function handleDarkMode() {
    chrome.storage.local.set({ darkMode: !darkMode });
  }
  function handleReload() {
    window.location.reload();
  }

  return (
    <nav className="flex justify-between items-center fixed w-96 z-50 dark:bg-slate-800/80 bg-slate-100/80 px-3 py-2 backdrop-blur-md">
      {showStreamTitle === '' ? (
        <Link
          component={Home}
          onClick={() => setShowStreamTitle('')}
          props={{
            showStreamTitle: showStreamTitle,
            setShowStreamTitle: setShowStreamTitle,
          }}
        >
          <div className="text-xl font-medium cursor-pointer hover:opacity-60">
            Liver
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-2 fade-in">
          <span className="w-32 truncate overflow-auto text-sm font-light cursor-pointer">
            {showStreamTitle}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2 dark:text-blue-500 text-slate-700">
        <div className="bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          <ArrowPathIcon
            className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500 hover:animate-spin"
            onClick={handleReload}
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          <Tooltip title="Add New VTuber">
            <Link
              component={Custom}
              onClick={() => setShowStreamTitle('')}
              props={{
                showStreamTitle: showStreamTitle,
                setShowStreamTitle: setShowStreamTitle,
              }}
            >
              <UserPlusIcon className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500" />
            </Link>
          </Tooltip>
          <Tooltip title="All Live VTubers">
            <Link component={ViewAll} onClick={() => setShowStreamTitle('')}>
              <UserGroupIcon className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500" />
            </Link>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          <Tooltip title={`${darkMode ? 'Light' : 'Dark'} Mode`}>
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
          </Tooltip>
          <Link
            component={Settings}
            onClick={() => setShowStreamTitle('')}
            props={{
              showStreamTitle: showStreamTitle,
              setShowStreamTitle: setShowStreamTitle,
            }}
          >
            <Tooltip title="Settings">
              <Cog6ToothIcon className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500" />
            </Tooltip>
          </Link>
        </div>
      </div>
    </nav>
  );
}
