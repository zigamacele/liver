import { database } from '@/database';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-pulse-dot/dist/index.css';
import { DisplayedLiver } from './DisplayedLiver';

export default function DisplayMyLivers({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
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
        database[group].forEach((branch: Branch) => {
          branch.members.forEach((member: Members) => {
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
          tempLiveStatus = {
            ...tempLiveStatus,
            [memberID]: {
              status: 'live',
              title: APIResponse[index].title,
              started: APIResponse[index].start_actual,
            },
          };
      }
      if (!Object.keys(tempLiveStatus).includes(memberID))
        tempLiveStatus = {
          ...tempLiveStatus,
          [memberID]: { status: 'offline' },
        };

      if (Object.keys(tempLiveStatus).length === displayLivers.length) {
        setLiverStatus(tempLiveStatus);
        setLoading(false);
      }
    });
  }

  function handleTwitter(memberID: string) {
    Object.keys(database).forEach((group) => {
      database[group].forEach((branch: Branch) => {
        branch.members.forEach((member: Members) => {
          if (member.channelID === memberID) {
            const url = 'https://twitter.com/';
            chrome.tabs.create({ url: url + member.twitter });
          }
        });
      });
    });
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
        {displayLivers.map((memberID) => {
          return (
            <div key={memberID}>
              <DisplayedLiver
                memberID={memberID}
                databaseInfo={databaseInfo}
                liverStatus={liverStatus}
                handleTwitter={handleTwitter}
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
