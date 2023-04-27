import DisplayCustomList from '@/Components/Custom/DisplayCustomList';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
  ChevronDownIcon,
  LifebuoyIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';

export interface IliversArray {
  [key: string]: {
    name: string;
    channelID: number;
    imageURL: string;
    twitter: string;
    retired?: boolean;
  };
}

export default function Custom() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [customList, setCustomList] = useState<any>({});
  const [needHelp, setNeedHelp] = useState(false);

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
              channelID: APIData.id,
              imageURL: APIData.photo,
              twitter: APIData.twitter,
            },
          },
        });
        setCustomList({
          [userInput]: {
            name: APIData.english_name,
            channelID: APIData.id,
            imageURL: APIData.photo,
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
            channelID: APIData.id,
            imageURL: APIData.photo,
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
            channelID: APIData.id,
            imageURL: APIData.photo,
            twitter: APIData.twitter,
          },
        };
        chrome.storage.local.set({
          customList: liversArray,
        });
        setCustomList(liversArray);
        setUserInput('');
      }
    });
  };

  useEffect(() => {
    chrome.storage.local.get('customList', function (data) {
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
    <section className="flex flex-col gap-1 min-h-[6em]">
      <div className="relative">
        <input
          value={userInput}
          className="w-full outline-none rounded-lg h-10 border placeholder:text-slate-400 dark:placeholder:text-slate-400 border-slate-300 dark:border-slate-600 px-4 py-1 bg-slate-200 dark:bg-slate-700 pr-6"
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
      {!needHelp ? (
        <div
          onClick={() => setNeedHelp(true)}
          className="flex items-center gap-1 px-1 py-0.5 cursor-pointer hover:opacity-60"
        >
          <LifebuoyIcon className="h-4 w-4" />
          <span>Need help?</span>
        </div>
      ) : (
        <div className="flex gap-1 bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg shadow-sm">
          <div>
            <div>Youtube ID needs to be in this format:</div>
            <div className="flex items-center">
              <div className="text-[10px]">youtube.com/channel/ </div>
              <span className="bg-slate-300 dark:bg-slate-600 text-[14px] font-bold ">
                UC4WvIIAo89_AzGUh1AZ6Dkg
              </span>
            </div>
            <div>If VTuber is using @username format</div>
            <div
              onClick={() =>
                chrome.tabs.create({
                  url: 'https://commentpicker.com/youtube-channel-id.php',
                })
              }
              className="text-blue-500 cursor-pointer hover:opacity-60"
            >
              You can find their ID here
            </div>
          </div>
        </div>
      )}
      {Object.keys(customList).length > 0 && (
        <DisplayCustomList customList={customList} />
      )}
    </section>
  );
}
