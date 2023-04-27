import { database } from '@/database';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DisplayedLiver } from './DisplayedLiver';
import { databaseSearch } from './SelectLiver';

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

export default function DisplayMyLivers() {
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

      if (Array.isArray(data.myLivers)) {
        let tempMyLivers: any = {};
        data.myLivers.forEach((channelID) => {
          tempMyLivers[channelID] = databaseSearch(channelID);
        });
        chrome.storage.local.set({ myLivers: tempMyLivers });
        window.location.reload();
      }
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
        setDisplayLivers(tempLiveStatus);
        setLoading(false);
      }
    }
  }

  return (
    <div className="my-2">
      {Object.keys(displayLivers).length !== 0 ? (
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
      ) : (
        <div className="flex justify-center opacity-40 mt-2">
          <span>Looks like your list is empty..</span>
        </div>
      )}
    </div>
  );
}
