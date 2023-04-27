import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import LiveStatus from './DisplayedLiver/LiveStatus';

import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid';
import { AiFillTwitterCircle } from 'react-icons/ai';

export function DisplayedLiver({
  member,
  loading,
  path,
}: {
  member: any;
  loading: boolean;
  path: string;
}) {
  const [showLiveStatus, setShowLiveStatus] = useState(false);
  const [customList, setCustomList] = useState<any>({});
  const [fetchingVTuber, setFetchingVTuber] = useState(false);
  let test: any;

  function checkMyLivers() {
    chrome.storage.local.get('customList', function (data) {
      setCustomList(data.customList);
    });
  }

  useEffect(() => {
    if (path === 'viewAll') checkMyLivers();
  }, []);

  useEffect(() => {
    chrome.storage.local.get('customList', function (data) {});
  }, [customList]);

  const deleteFromMyLivers = (channelID: string) => {
    chrome.storage.local.get('customList', function (data) {
      let tempCustomList: any;
      tempCustomList = data.customList;
      delete tempCustomList[channelID];
      chrome.storage.local.set({ customList: tempCustomList });
      setCustomList(tempCustomList);
    });
  };

  const addToMyLivers = async (channelID: string) => {
    setFetchingVTuber(true);
    const config = {
      url: `https://holodex.net/api/v2/channels/${channelID}`,
      headers: {
        'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.request(config);
      const twitter = data.twitter;
      chrome.storage.local.get('customList', function (data) {
        let tempCustomList = data.customList;
        tempCustomList = {
          ...tempCustomList,
          [channelID]: {
            name: member.channel.english_name,
            imageURL: member.channel.photo,
            channelID: member.channel.id,
            twitter: twitter,
            status: member.status,
            title: member.title,
            started: member.start_actual,
            org: member.channel.org,
            viewers: member.live_viewers,
          },
        };
        chrome.storage.local.set({ customList: tempCustomList });
        setCustomList(tempCustomList);
      });
      setFetchingVTuber(false);
    } catch (error) {
      console.log(error);
    }
  };

  function handleTwitter(twitterID: string) {
    const url = 'https://twitter.com/';
    chrome.tabs.create({ url: url + twitterID });
  }

  const url = `https://youtube.com/channel/${
    member.channelID || member.channel.id
  }/live`;
  const isLive = member.status === 'live';

  return (
    <div className="fade-in ">
      {showLiveStatus && isLive && <LiveStatus member={member} />}
      <div
        className="relative bg-green-"
        onMouseEnter={() => {
          setShowLiveStatus(true);
        }}
        onMouseLeave={() => {
          setShowLiveStatus(false);
        }}
      >
        <img
          src={member.imageURL || member.channel.photo}
          alt={member.name || member.channel.english_name}
          className={`rounded-full h-20 liver border-4 shadow-md ${
            isLive
              ? 'border-red-500'
              : 'border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800'
          } cursor-pointer hover:opacity-80`}
          onClick={(e) => {
            chrome.tabs.create({ url: url });
          }}
        />
        {!loading && member.twitter && (
          <div
            className={`${
              isLive
                ? 'text-white hover:text-red-200'
                : 'text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
            } cursor-pointer absolute left-[3em] bottom-[6em] fade-in`}
            onClick={() => handleTwitter(member.twitter)}
          >
            <AiFillTwitterCircle className="absolute text-lg left-[1.15em] bottom-[-0.85em] z-10 " />
            <span
              className={`absolute text-xl left-[0.975em] bottom-[-0.82em] ${
                isLive ? 'bg-red-500' : 'bg-white dark:bg-slate-700'
              } h-5 w-5 rounded-full`}
            ></span>
          </div>
        )}
        {path === 'viewAll' && !fetchingVTuber && (
          <div className="absolute left-[4.8em] bottom-[4.8em] rounded-full  fade-in text-red-500">
            {Object.keys(customList).includes(member.channel.id) ? (
              <BookmarkSlashIcon
                onClick={() => deleteFromMyLivers(member.channel.id)}
                className="h-5 w-5 p-0.5  bg-white border-2 hover:text-red-300 border-red-500 rounded-full cursor-pointer"
              />
            ) : (
              <BookmarkIcon
                onClick={() => addToMyLivers(member.channel.id)}
                className="h-5 w-5 p-0.5 text-black hover:text-neutral-500 bg-white border-2 border-red-500 rounded-full cursor-pointer"
              />
            )}
          </div>
        )}
        {fetchingVTuber && (
          <div className="absolute left-[4.7em] bottom-[4.6em] bg-red-500 p-1 pb-0 rounded-full fade-in">
            <ClipLoader size={15} color="white" />
          </div>
        )}
        {loading && (
          <div>
            <div className="absolute left-[4.5em] bottom-[4.5em] bg-white p-1 pb-0 rounded-full dark:bg-slate-700 fade-in">
              <ClipLoader size={15} />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px]">
              <div className="py-0.5 px-1.5 bg-white dark:bg-slate-700  dark:text-white rounded-full">
                <p className="text-[10px] fade-in">OFFLINE</p>
              </div>
            </div>
          </div>
        )}
        {!loading && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px]">
            {isLive && (
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 py-0.5 px-1.5 bg-red-500 text-slate-100 dark:text-white rounded-full z-50">
                  <p className="text-[10px] fade-in">LIVE</p>
                </div>
                <div className="absolute bottom-[-1.25px] left-[-1.25em] w-8 h-5 rounded-full bg-red-500/60 animate-ping"></div>
              </div>
            )}
            {!isLive && (
              <div className="py-0.5 px-1.5 bg-white dark:bg-slate-700  dark:text-white rounded-full">
                <p className="text-[10px] fade-in">OFFLINE</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
