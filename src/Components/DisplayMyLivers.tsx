import { database } from '@/database';
import React, { useEffect, useState } from 'react';

export default function DisplayMyLivers() {
  const [displayLivers, setDisplayLivers] = useState([]);
  const [liverStatus, setLiverStatus] = useState({});
  const [databaseInfo, setDatabaseInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const axios = require('axios');
  const config = {
    headers: {
      'X-APIKEY': process.env.NEXT_PUBLIC_HOLODEX,
    },
  };

  useEffect(() => {
    getMyLivers();
  }, []);

  useEffect(() => {
    databaseSearch();
    setLoading(false);
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

  async function getLiveStatus(memberID: string) {
    const url = `https://holodex.net/api/v2/live?channel_id=${memberID}`;
    try {
      const response = await axios.get(url, config);
      setLiverStatus({ ...liverStatus, [memberID]: response });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {loading ? (
        <div>a</div>
      ) : (
        <div>
          {displayLivers.map((memberID) => {
            // getLiver(memberID);
            return (
              <div key={memberID}>
                {database[memberID] ? databaseInfo[memberID].name : null}
              </div>
            );
          })}
          <button
            onClick={() =>
              console.log(displayLivers, databaseInfo, liverStatus)
            }
          >
            clog
          </button>
        </div>
      )}
    </div>
  );
}
