import { database } from '@/database';
import React, { useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SelectLiver() {
  const [selectedLivers, setSelectedLivers] = useState<any>([]);
  useEffect(() => {
    chrome.storage.local.get('myLivers', function (data: any) {
      setSelectedLivers([...data.myLivers]);
    });
  }, []);

  function handleARLiver(memberID: string) {
    let liversArray: string[] = [];
    chrome.storage.local.get('myLivers', function (data: any) {
      if (data.myLivers === undefined || data.myLivers.length === 0) {
        chrome.storage.local.set({ myLivers: [memberID] });
        setSelectedLivers([memberID]);
        return;
      }
      liversArray = data.myLivers;
      if (liversArray.includes(memberID)) {
        const filtered = liversArray.filter((mID) => mID !== memberID);
        chrome.storage.local.set({ myLivers: filtered });
        setSelectedLivers(filtered);
      } else {
        liversArray.push(memberID);
        chrome.storage.local.set({ myLivers: liversArray });
        setSelectedLivers(liversArray);
      }
    });
  }

  return (
    <div className="mt-4">
      {database.map((branch) => {
        return (
          <div key={branch.branchID} className="mt-2">
            <div className="flex justify-between items-center">
              <p className="font-medium">{branch.branchID}</p>
            </div>
            <div className="flex gap-1">
              {branch.members.map((member) => {
                return (
                  <div
                    key={member.name}
                    onClick={() => handleARLiver(member.channelID)}
                    className="mt-1"
                  >
                    {!selectedLivers.includes(member.channelID) ? (
                      <img
                        src={member.imageURL}
                        alt={member.name}
                        className="h-14 w-14 rounded-full border-2 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:opacity-80"
                      />
                    ) : (
                      <div className="relative cursor-pointer">
                        <CheckCircleIcon className="dark:text-slate-200 text-slate-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
                        <img
                          src={member.imageURL}
                          alt={member.name}
                          className="h-14 w-14 opacity-50 rounded-full p-1 bg-slate-200 dark:bg-slate-700"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
