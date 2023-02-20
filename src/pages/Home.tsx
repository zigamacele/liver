import DisplayMyLivers from '@/Components/DisplayMyLivers';
import React from 'react';
import { Link } from 'react-chrome-extension-router';
import Settings from './Settings';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Liver</p>
        <Link component={Settings}>
          <Cog6ToothIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </div>
      <DisplayMyLivers />
    </div>
  );
}

//TODO dark/light mode
