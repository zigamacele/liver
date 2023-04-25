import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { vtuberInfo } from './DisplayMyLivers';
import LiveStatus from './DisplayedLiver/LiveStatus';

import { AiFillTwitterCircle } from 'react-icons/ai';

export function DisplayedLiver({
  member,
  loading,
}: {
  member: vtuberInfo;
  loading: boolean;
}) {
  const [showLiveStatus, setShowLiveStatus] = useState(false);

  function handleTwitter(twitterID: string) {
    const url = 'https://twitter.com/';
    chrome.tabs.create({ url: url + twitterID });
  }

  const url = `https://youtube.com/channel/${member.channelID}/live`;
  const isLive = member.status === 'live';

  return (
    <div className="fade-in">
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
          src={member.imageURL}
          alt={member.name}
          className={`rounded-full h-20 liver border-4 ${
            isLive
              ? 'border-red-500'
              : 'border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800'
          } cursor-pointer hover:opacity-80`}
          onClick={(e) => {
            chrome.tabs.create({ url: url });
          }}
        />
        {!loading && (
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
