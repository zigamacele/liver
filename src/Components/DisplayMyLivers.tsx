import { database } from '@/database';
import React, { useEffect, useState } from 'react';
import 'react-pulse-dot/dist/index.css';
import ClipLoader from 'react-spinners/ClipLoader';

// @ts-ignore
import PulseDot from 'react-pulse-dot';

export default function DisplayMyLivers() {
  const [displayLivers, setDisplayLivers] = useState([]);
  const [liverStatus, setLiverStatus] = useState<any>({});
  const [databaseInfo, setDatabaseInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const axios = require('axios');

  useEffect(() => {
    getMyLivers();
  }, []);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  useEffect(() => {
    databaseSearch();
    getLiveStatus();
  }, [displayLivers]);

  function getMyLivers() {
    chrome.storage.local.get('myLivers', function (data: any) {
      if (data.myLivers === undefined || data.myLivers.length === 0) {
        return;
      }
      setDisplayLivers(data.myLivers);
    });
  }

  async function databaseSearch() {
    let tempDatabase = {};
    displayLivers.forEach((memberID) => {
      database.forEach((branch: any) => {
        branch.members.forEach((member: any) => {
          if (member.channelID === memberID) {
            tempDatabase = { ...tempDatabase, [memberID]: member };
          }
        });
      });
    });
    setDatabaseInfo(tempDatabase);
  }

  function getLiveStatus() {
    let tempLiveStatus = {};

    async function individualLiveStatus(memberID: string) {
      const url = `https://holodex.net/api/v2/live?channel_id=${memberID}`;
      const config = {
        headers: {
          'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.get(url, config);
        tempLiveStatus = {
          ...tempLiveStatus,
          [memberID]: response.data,
        };
        console.log(tempLiveStatus);
        if (Object.keys(tempLiveStatus).length === displayLivers.length) {
          setLiverStatus(tempLiveStatus);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    displayLivers.forEach((memberID) => individualLiveStatus(memberID));
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap justify-center gap-2">
        {displayLivers.map((memberID) => {
          return (
            <div key={memberID}>
              {!databaseInfo[memberID] ? null : (
                <div className="relative">
                  <img
                    src={databaseInfo[memberID].imageURL}
                    alt={databaseInfo[memberID].name}
                    className="rounded-full h-20 liver border-4 border-white dark:border-slate-700"
                  />
                  {loading ? (
                    <div className="absolute left-[4.5em] bottom-[4.5em] bg-white p-1 pb-0 rounded-full dark:bg-slate-700">
                      <ClipLoader size={15} />
                    </div>
                  ) : (
                    <div className="absolute left-[4em] bottom-[4em]">
                      {!liverStatus[memberID][0] ||
                      liverStatus[memberID][0].status !== 'live' ? (
                        <div className="absolute left-[-1em] bottom-[0.7em] py-0.5 px-1.5 bg-white dark:bg-slate-700  dark:text-white rounded-full">
                          <p className="text-[10px]">OFFLINE</p>
                        </div>
                      ) : (
                        <PulseDot className="text-xl" color="danger" />
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

//TODO when clicking on image go to youtube link
