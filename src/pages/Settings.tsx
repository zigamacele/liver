import React from 'react';
import { Link } from 'react-chrome-extension-router';
import Home from './Home';

import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import SelectLiver from '../Components/SelectLiver';

function handleReset() {
  chrome.storage.local.clear();
}

export default function Settings() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link component={Home}>
          <ArrowSmallLeftIcon className="h-6 w-6 text-blue-500" />
        </Link>
        <p>Settings</p>
      </div>
      <div>Dark mode /Light mode</div>
      <SelectLiver />
      <button onClick={handleReset}>reset chrome.storage</button>
    </div>
  );
}
