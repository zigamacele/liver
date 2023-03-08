import { database } from '@/database';
import React, { useEffect, useState } from 'react';
import 'react-pulse-dot/dist/index.css';
import ClipLoader from 'react-spinners/ClipLoader';

// @ts-ignore
import PulseDot from 'react-pulse-dot';

import { AiFillTwitterCircle } from 'react-icons/ai';

export default function DisplayMyLivers() {
  const [displayLivers, setDisplayLivers] = useState([]);
  const [liverStatus, setLiverStatus] = useState({});
  const [databaseInfo, setDatabaseInfo] = useState<vtubersFromDB>({});
  const [loading, setLoading] = useState(true);
  const [APIResponse, setAPIResponse] = useState<any>([]);
  const axios = require('axios');

  interface vtuberInfo {
    name: string;
    imageURL: string;
    channelID: string;
    retired: boolean;
    twitter: string;
  }

  interface vtubersFromDB {
    [key: string]: vtuberInfo;
  }

  useEffect(() => {
    getMyLivers();
    getAPIData();
  }, []);

  useEffect(() => {
    databaseSearch();
  }, [displayLivers]);

  useEffect(() => {
    getLiveStatus();
  }, [APIResponse]);

  function getMyLivers() {
    chrome.storage.local.get('myLivers', function (data) {
      if (data.myLivers === undefined || data.myLivers.length === 0) {
        return;
      }
      setDisplayLivers(data.myLivers);
    });
  }

  async function databaseSearch() {
    let tempDatabase = {};
    displayLivers.forEach((memberID) => {
      Object.keys(database).forEach((group) => {
        database[group].forEach((branch: any) => {
          branch.members.forEach((member: any) => {
            if (member.channelID === memberID) {
              tempDatabase = { ...tempDatabase, [memberID]: member };
            }
          });
        });
      });
    });
    setDatabaseInfo(tempDatabase);
  }

  async function getAPIData() {
    const url = 'https://holodex.net/api/v2/live';
    const config = {
      headers: {
        'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.get(url, config);
      setAPIResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getLiveStatus() {
    let tempLiveStatus = {};
    displayLivers.forEach((memberID) => {
      for (let index = 0; index < APIResponse.length; index++) {
        if (
          memberID === APIResponse[index].channel.id &&
          APIResponse[index].status === 'live'
        )
          tempLiveStatus = { ...tempLiveStatus, [memberID]: 'live' };
      }
      if (!Object.keys(tempLiveStatus).includes(memberID))
        tempLiveStatus = { ...tempLiveStatus, [memberID]: 'offline' };

      if (Object.keys(tempLiveStatus).length === displayLivers.length) {
        setLiverStatus(tempLiveStatus);
        setLoading(false);
      }
    });
  }

  function handleTwitter(memberID: string) {
    Object.keys(database).forEach((group) => {
      database[group].forEach((branch: any) => {
        branch.members.forEach((member: any) => {
          if (member.channelID === memberID) {
            const url = 'https://twitter.com/';
            chrome.tabs.create({ url: url + member.twitter });
          }
        });
      });
    });
  }

  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center gap-3">
        {displayLivers.map((memberID) => {
          const url = `https://youtube.com/channel/${memberID}/live`;
          return (
            <div key={memberID}>
              {!databaseInfo[memberID] ? null : (
                <div className="relative">
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
                    <AiFillTwitterCircle className="absolute text-lg left-[1.15em] bottom-[-0.85em]  z-10 " />
                    <span className="absolute text-xl left-[0.975em] bottom-[-0.82em] bg-white dark:bg-slate-700 h-5 w-5 rounded-full"></span>
                  </div>

                  {loading ? (
                    <div className="absolute left-[4.5em] bottom-[4.5em] bg-white p-1 pb-0 rounded-full dark:bg-slate-700">
                      <ClipLoader size={15} />
                    </div>
                  ) : (
                    <div className="absolute left-[4em] bottom-[4em]">
                      {liverStatus[memberID] === 'offline' ? (
                        <div className="absolute left-[-1em] bottom-[0.7em] py-0.5 px-1.5 bg-white dark:bg-slate-700  dark:text-white rounded-full">
                          <p className="text-[10px]">OFFLINE</p>
                        </div>
                      ) : (
                        <div>
                          <PulseDot
                            className="absolute text-xl bottom-[-0.15em] z-10"
                            color="danger"
                          />
                          <span className="absolute text-xl  left-[0.3em] bottom-[0.17em] bg-white dark:bg-slate-700 h-7 w-7 rounded-full"></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
