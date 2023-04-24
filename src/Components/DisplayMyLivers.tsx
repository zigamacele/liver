import { database } from '@/database';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import 'react-pulse-dot/dist/index.css';
import { DisplayedLiver } from './DisplayedLiver';

export interface vtuberInfo {
  name: string;
  imageURL: string;
  channelID: string;
  retired: boolean;
  twitter: string;
  status?: string;
  title?: string;
  started?: number;
}

interface vtubersFromDB {
  [key: string]: vtuberInfo;
}

interface Members {
  name: string;
  imageURL: string;
  channelID: string;
  retired: boolean;
  twitter: string;
}

interface Branch {
  branchID: string;
  debut: string;
  members: Members[];
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

  const flattenedDatabase = Object.values(database).flatMap((group: any) =>
    group.flatMap((branch: any) => branch.members)
  );

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

  function startedStreaming(startTime: string) {
    const difference = +new Date() - +new Date(startTime);
    const diffDuration = moment.duration(-difference).humanize(true);
    if (diffDuration === 'Invalid date') return 'starting soon';
    return diffDuration;
  }

  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center gap-3">
        {Object.keys(displayLivers).map((channelID) => {
          return (
            <div key={channelID}>
              <DisplayedLiver
                member={displayLivers[channelID]}
                startedStreaming={startedStreaming}
                loading={loading}
                showStreamTitle={showStreamTitle}
                setShowStreamTitle={setShowStreamTitle}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
