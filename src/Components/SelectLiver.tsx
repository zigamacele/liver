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
      console.log('data', data.myLivers, 'liversarray', liversArray);
      if (liversArray.includes(memberID)) {
        const filtered = liversArray.filter((mID) => mID !== memberID);
        chrome.storage.local.set({ myLivers: filtered });
        setSelectedLivers(filtered);
        console.log('filtered:', filtered, 'liversarray:', liversArray);
      } else {
        liversArray.push(memberID);
        chrome.storage.local.set({ myLivers: liversArray });
        setSelectedLivers(liversArray);
        console.log('liversarray:', liversArray);
      }
    });
  }

  return (
    <div>
      {database.map((branch) => {
        return (
          <div key={branch.branchID}>
            <div className="flex">
              <p>{branch.branchID}</p>
              <p>{branch.debut}</p>
            </div>
            <div className="flex gap-1">
              {branch.members.map((member) => {
                return (
                  <div
                    key={member.name}
                    onClick={() => handleARLiver(member.channelID)}
                  >
                    {!selectedLivers.includes(member.channelID) ? (
                      <img
                        src={member.imageURL}
                        alt={member.name}
                        className="h-12 w-12 rounded"
                      />
                    ) : (
                      <div className="relative">
                        <CheckCircleIcon className="dark:text-slate-200 text-slate-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
                        <img
                          src={member.imageURL}
                          alt={member.name}
                          className="h-12 w-12 opacity-50 rounded"
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
