import { database } from '@/database';
import React, { useEffect, useState } from 'react';
import 'react-pulse-dot/dist/index.css';

// @ts-ignore
import PulseDot from 'react-pulse-dot';

export default function DisplayMyLivers() {
  const [displayLivers, setDisplayLivers] = useState([]);
  const [liverStatus, setLiverStatus] = useState<any>({});
  const [databaseInfo, setDatabaseInfo] = useState<any>({});
  const axios = require('axios');

  useEffect(() => {
    getMyLivers();
  }, []);

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
      const options = {
        method: 'GET',
        url: 'https://holodex.net/api/v2/live',
        params: { channel_id: memberID },
        headers: {
          'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
          'Content-Type': 'application/json',
        },
      };
      const config = {
        headers: {
          'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
          'Content-Type': 'application/json',
        },
      };
      const url = `https://holodex.net/api/v2/live?channel_id=${memberID}`;
      // axios
      //   .request(options)
      //   .then(function (response: any) {
      //     console.log(response);
      //     tempLiveStatus = { ...tempLiveStatus, [memberID]: response };
      //     console.log(tempLiveStatus);
      //     if (Object.keys(tempLiveStatus).length === displayLivers.length)
      //       setLiverStatus(tempLiveStatus);
      //   })
      //   .catch(function (error: any) {
      //     console.error(error);
      //   });

      try {
        const response = await axios.get(url, config);
        tempLiveStatus = {
          ...tempLiveStatus,
          [memberID]: response.data,
        };
        console.log(tempLiveStatus);
        if (Object.keys(tempLiveStatus).length === displayLivers.length)
          setLiverStatus(tempLiveStatus);
      } catch (error) {
        console.log(error);
      }
    }
    displayLivers.forEach((memberID) => individualLiveStatus(memberID));
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {displayLivers.map((memberID) => {
          return (
            <div key={memberID}>
              {!databaseInfo[memberID] ? null : (
                <div className="relative">
                  <img
                    src={databaseInfo[memberID].imageURL}
                    alt={databaseInfo[memberID].name}
                    className="rounded-full h-20 liver border-4 border-white"
                  />
                  {!liverStatus[memberID] ? null : (
                    <div className="absolute left-[4em] bottom-[4em]">
                      {!liverStatus[memberID][0] ||
                      liverStatus[memberID][0].status !== 'live' ? (
                        <PulseDot className="text-xl" color="danger" />
                      ) : (
                        <PulseDot className="text-xl" />
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
