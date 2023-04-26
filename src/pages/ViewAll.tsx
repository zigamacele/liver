import { DisplayedLiver } from '@/Components/DisplayedLiver';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ViewAll() {
  const [APIResponse, setAPIResponse] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="mt-3 mb-1">
      {loading && (
        <div className="flex flex-wrap justify-center gap-3">
          {[...Array(20)].map((x, index) => (
            <div
              key={index}
              className="h-20 w-20 bg-slate-300/60 dark:bg-slate-700/80 animate-pulse rounded-full fade-in"
            ></div>
          ))}
        </div>
      )}
      {!loading && (
        <div className="flex flex-wrap justify-center gap-3">
          {APIResponse.map((channelID: any, index: number) => {
            if (channelID.status === 'live') {
              return (
                <div key={channelID}>
                  <DisplayedLiver
                    member={channelID}
                    loading={loading}
                    path="viewAll"
                  />
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
