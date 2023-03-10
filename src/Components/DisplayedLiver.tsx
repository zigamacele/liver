import React, { useEffect, useState } from 'react';
import 'react-pulse-dot/dist/index.css';
import ClipLoader from 'react-spinners/ClipLoader';

// @ts-ignore
import PulseDot from 'react-pulse-dot';

import { AiFillTwitterCircle } from 'react-icons/ai';

export function DisplayedLiver({
  memberID,
  databaseInfo,
  liverStatus,
  handleTwitter,
  startedStreaming,
  loading,
  showStreamTitle,
  setShowStreamTitle,
}: {
  memberID: string;
  databaseInfo: any;
  liverStatus: any;
  handleTwitter: any;
  startedStreaming: any;
  loading: any;
  showStreamTitle: string;
  setShowStreamTitle: any;
}) {
  const [showWhenStarted, setWhenStarted] = useState(false);

  const url = `https://youtube.com/channel/${memberID}/live`;
  return (
    <div key={memberID}>
      {!databaseInfo[memberID] ? null : (
        <div
          className="relative"
          onMouseEnter={() => setWhenStarted(true)}
          onMouseLeave={() => setWhenStarted(false)}
        >
          <img
            src={databaseInfo[memberID].imageURL}
            alt={databaseInfo[memberID].name}
            className="rounded-full h-20 liver border-4 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:opacity-80"
            onClick={(e) => {
              chrome.tabs.create({ url: url });
            }}
          />
          <div
            className="text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer absolute left-[4em] bottom-[4em]"
            onClick={() => handleTwitter(memberID)}
          >
            <AiFillTwitterCircle className="absolute text-lg left-[1.15em] bottom-[-0.85em] z-10 " />
            <span className="absolute text-xl left-[0.975em] bottom-[-0.82em] bg-white dark:bg-slate-700 h-5 w-5 rounded-full"></span>
          </div>

          {loading ? (
            <div className="absolute left-[4.5em] bottom-[4.5em] bg-white p-1 pb-0 rounded-full dark:bg-slate-700">
              <ClipLoader size={15} />
            </div>
          ) : (
            <div className="absolute left-[4em] bottom-[4em]">
              {liverStatus[memberID]['status'] === 'offline' ? (
                <div className="absolute left-[-1em] bottom-[0.7em] py-0.5 px-1.5 bg-white dark:bg-slate-700  dark:text-white rounded-full">
                  <p className="text-[10px]">OFFLINE</p>
                </div>
              ) : (
                <div>
                  {!showWhenStarted ? null : (
                    <div className="flex absolute justify-center items-center left-[-5.95em] bottom-[-4.5em] w-32 z-15 font-light text-xs animate-bounce">
                      <span className="py-0.5 px-1.5 bg-white dark:bg-slate-700 rounded-full ">
                        {startedStreaming(liverStatus[memberID]['started'])}
                      </span>
                    </div>
                  )}
                  <PulseDot
                    onClick={() => {
                      if (showStreamTitle === liverStatus[memberID].title)
                        setShowStreamTitle('');
                      else setShowStreamTitle(liverStatus[memberID].title);
                    }}
                    className="absolute text-xl bottom-[-0.15em] z-10 cursor-pointer hover:opacity-60"
                    color="danger"
                  />
                  <span className="absolute text-xl left-[0.3em] bottom-[0.17em] bg-white dark:bg-slate-700 h-7 w-7 rounded-full"></span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
