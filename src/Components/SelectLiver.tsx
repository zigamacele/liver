import { database } from '@/database';
import React, { useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SelectLiver({
  settingsQuery,
  showStreamTitle,
  setShowStreamTitle,
}: {
  settingsQuery: any;
  showStreamTitle: string;
  setShowStreamTitle: any;
}) {
  const [selectedLivers, setSelectedLivers] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    chrome.storage.local.get('myLivers', function (data) {
      setSelectedLivers([...data.myLivers]);
    });
  }, []);

  console.log('select', settingsQuery);

  function handleARLiver(memberID: string) {
    let liversArray: string[] = [];
    chrome.storage.local.get('myLivers', function (data) {
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
      <div>
        {Object.keys(database).map((group, index) => {
          return <p key={`${group}-${index}`}></p>;
        })}
      </div>
      <div>
        {!settingsQuery
          ? null
          : database[settingsQuery].map((branch: any, index: any) => {
              return (
                <div key={branch.branchID} className="mt-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{branch.branchID}</p>
                    {/* <p className="font-light">{branch.debut}</p> */}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {branch.members.map((member: any) => {
                      return (
                        <div
                          key={member.name}
                          onClick={() => {
                            handleARLiver(member.channelID);
                          }}
                          onMouseEnter={() => setShowStreamTitle(member.name)}
                          onMouseLeave={() => setShowStreamTitle('')}
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
                              <CheckCircleIcon className="dark:text-slate-200 text-slate-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
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
    </div>
  );
}
