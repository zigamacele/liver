import DisplayCustomList from '@/Components/Custom/DisplayCustomList';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { PlusCircleIcon } from '@heroicons/react/24/solid';

export interface IliversArray {
  [key: string]: {
    name: string;
    id: number;
    photo: string;
    twitter: string;
  };
}

export default function Custom() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [customList, setCustomList] = useState<any>({});
  const [darkMode, setDarkMode] = React.useState(false);

  async function getAPIData() {
    const config = {
      url: `https://holodex.net/api/v2/channels/${userInput}`,
      headers: {
        'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.request(config);
      await saveToChromeStorage(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const saveToChromeStorage = async (APIData: any) => {
    let liversArray: IliversArray = {};

    chrome.storage.local.get('customList', function (data) {
      if (
        data.customList === undefined ||
        Object.keys(data.customList).length === 0
      ) {
        chrome.storage.local.set({
          customList: {
            [userInput]: {
              name: APIData.english_name,
              id: APIData.id,
              photo: APIData.photo,
              twitter: APIData.twitter,
            },
          },
        });
        setCustomList({
          [userInput]: {
            name: APIData.english_name,
            id: APIData.id,
            photo: APIData.photo,
            twitter: APIData.twitter,
          },
        });
        return;
      }
      liversArray = data.customList;
      if (Object.keys(liversArray).includes(userInput)) {
        delete liversArray[userInput as keyof IliversArray];
        liversArray = {
          ...liversArray,
          [userInput]: {
            name: APIData.english_name,
            id: APIData.id,
            photo: APIData.photo,
            twitter: APIData.twitter,
          },
        };
        chrome.storage.local.set({
          customList: liversArray,
        });
        setCustomList(liversArray);
      } else {
        liversArray = {
          ...liversArray,
          [userInput]: {
            name: APIData.english_name,
            id: APIData.id,
            photo: APIData.photo,
            twitter: APIData.twitter,
          },
        };
        chrome.storage.local.set({
          customList: liversArray,
        });
        setCustomList(liversArray);
      }
    });
  };

  useEffect(() => {
    chrome.storage.local.get('customList', function (data) {
      console.log('data', data.customList);
      setCustomList(data.customList);
    });
    chrome.storage.onChanged.addListener(function (changes) {
      if ('customList' in changes) {
        setCustomList(changes.customList.newValue);
      }
    });
  }, []);

  const handleClick = () => {
    if (userInput.length > 3 && !loading) {
      setLoading(true);
      getAPIData();
    }
  };

  return (
    <section>
      <div
        onClick={() =>
          chrome.storage.local.set({
            customList: {},
          })
        }
      >
        clear
      </div>
      <div className="relative">
        <input
          value={userInput}
          className="w-full outline-none rounded-full h-10 border placeholder:text-slate-400 dark:placeholder:text-slate-400 border-slate-300 dark:border-slate-600 p-2 bg-slate-200 dark:bg-slate-700 pr-6"
          placeholder="Enter VTuber's Youtube ID"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <PlusCircleIcon
          onClick={handleClick}
          className={`h-6 w-6 z-50 absolute top-1/2 right-2 -translate-y-1/2 hover:opacity-70 cursor-pointer ${
            loading && 'animate-pulse'
          }`}
        />
      </div>

      {Object.keys(customList).length > 0 && (
        <DisplayCustomList customList={customList} />
      )}
    </section>
  );
}
