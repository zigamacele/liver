import React, { useEffect, useState } from 'react';
import 'react-pulse-dot/dist/index.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { vtuberInfo } from './DisplayMyLivers';

// @ts-ignore
import PulseDot from 'react-pulse-dot';

import { AiFillTwitterCircle } from 'react-icons/ai';

export function DisplayedLiver({
  member,

  startedStreaming,
  loading,
  showStreamTitle,
  setShowStreamTitle,
}: {
  member: vtuberInfo;
  startedStreaming: any;
  loading: boolean;
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
  const [showWhenStarted, setWhenStarted] = useState(false);

  function handleTwitter(twitterID: string) {
    const url = 'https://twitter.com/';
    chrome.tabs.create({ url: url + twitterID });
  }

  const url = `https://youtube.com/channel/${member.channelID}/live`;

  return (
    <div className="fade-in">
      <div
        className="relative"
        onMouseEnter={() => {
          setWhenStarted(true);
          if (member.status === 'live') setShowStreamTitle(member.title);
        }}
        onMouseLeave={() => {
          setWhenStarted(false);
          setShowStreamTitle('');
        }}
      >
        <img
          src={member.imageURL}
          alt={member.name}
          className="rounded-full h-20 liver border-4 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:opacity-80"
          onClick={(e) => {
            chrome.tabs.create({ url: url });
          }}
        />
        <div
          className="text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer absolute left-[4em] bottom-[4em]"
          onClick={() => handleTwitter(member.twitter)}
        >
          <AiFillTwitterCircle className="absolute text-lg left-[1.15em] bottom-[-0.85em] z-10 " />
          <span className="absolute text-xl left-[0.975em] bottom-[-0.82em] bg-white dark:bg-slate-700 h-5 w-5 rounded-full"></span>
        </div>

        {loading ? (
          <div className="absolute left-[4.5em] bottom-[4.5em] bg-white p-1 pb-0 rounded-full dark:bg-slate-700 fade-in">
            <ClipLoader size={15} />
          </div>
        ) : (
          <div className="absolute left-[4em] bottom-[4em]">
            {member.status === 'offline' ? (
              <div className="absolute left-[-1em] bottom-[0.7em] py-0.5 px-1.5 bg-white dark:bg-slate-700  dark:text-white rounded-full">
                <p className="text-[10px] fade-in">OFFLINE</p>
              </div>
            ) : (
              <div>
                {!showWhenStarted ? null : (
                  <div className="flex absolute justify-center items-center left-[-5.95em] bottom-[-4.5em] w-32 z-15 font-light text-xs animate-bounce">
                    <span className="py-0.5 px-1.5 bg-white dark:bg-slate-700 rounded-full fade-in">
                      {startedStreaming(member.started)}
                    </span>
                  </div>
                )}
                <PulseDot
                  className="absolute text-xl bottom-[-0.15em] z-10 cursor-pointer fade-in"
                  color="danger"
                />
                <span className="absolute text-xl left-[0.3em] bottom-[0.17em] bg-white dark:bg-slate-700 h-7 w-7 rounded-full"></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
