import { database } from '@/database';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DisplayedLiver } from './DisplayedLiver';
import { databaseSearch, flattenedDatabase } from './SelectLiver';
//TODO convert all format -> new format of myLivers

export interface vtuberInfo {
  name: string;
  imageURL: string;
  channelID: string;
  retired: boolean;
  twitter: string;
  status?: string;
  title?: string;
  started?: string;
  fullName?: string;
  org?: string;
  viewers?: number;
  scheduled?: number;
}

interface vtubersFromDB {
  [key: string]: vtuberInfo;
}

export default function DisplayMyLivers({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
  const [displayLivers, setDisplayLivers] = useState<vtubersFromDB>({});
  const [loading, setLoading] = useState(true);
  const [APIResponse, setAPIResponse] = useState<any>([]);

  useEffect(() => {
    getMyLivers();
    getAPIData();
  }, []);

  useEffect(() => {
    getLiveStatus();
  }, [APIResponse]);

  function getMyLivers() {
    chrome.storage.local.get(['myLivers', 'customList'], function (data) {
      setDisplayLivers({ ...data.myLivers, ...data.customList });
    });
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
      console.log(response);
      setAPIResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getLiveStatus() {
    let tempLiveStatus = {};
    for (const [key, value] of Object.entries(displayLivers)) {
      for (let index = 0; index < APIResponse.length; index++) {
        if (
          key === APIResponse[index].channel.id &&
          APIResponse[index].status === 'live'
        )
          tempLiveStatus = {
            ...tempLiveStatus,
            [key]: {
              ...value,
              status: 'live',
              title: APIResponse[index].title,
              started: APIResponse[index].start_actual,
              scheduled: APIResponse[index].start_scheduled,
              viewers: APIResponse[index].live_viewers,
              org: APIResponse[index].channel.org,
              fullName: APIResponse[index].channel.name,
            },
          };
      }
      if (!Object.keys(tempLiveStatus).includes(key))
        tempLiveStatus = {
          ...tempLiveStatus,
          [key]: { ...value, status: 'offline' },
        };

      if (
        Object.keys(tempLiveStatus).length === Object.keys(displayLivers).length
      ) {
        console.log('temp', tempLiveStatus);
        setDisplayLivers(tempLiveStatus);
        setLoading(false);
      }
    }
  }

  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center gap-3">
        {Object.keys(displayLivers).map((channelID) => {
          return (
            <div key={channelID}>
              <DisplayedLiver
                member={displayLivers[channelID]}
                loading={loading}
                path="Home"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
